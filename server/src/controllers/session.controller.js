import Session from '../models/session.model.js';
import { chatClient, streamClient } from '../lib/stream.js';
export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: 'Problem and difficulty are required' });
    }

    // generate a unique callId for Stream video call

    const callId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;

    // create session in our database
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    // create stream video call
    await streamClient.video.call('default', callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: {
          problem,
          difficulty,
          sessionId: session._id.toString(),
        },
      },
    });

    // chat messages
    const channel = chatClient.channel('messages', callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      menubar: [callId],
    });

    await channel.create();
    res.status(201).json({
      message: 'Session created successfully',
      session,
    });

    // todo: send some email and notification to the host
  } catch (error) {
    console.error('Error in  createSession controller:', error);
    req.status(500).json({ message: 'Internal server error.' });
  }
}

export async function getActiveSessions(_, res) {
  try {
    const sessions = await Session.find({ status: 'active' })
      .populate('host', 'name profileImage email clerkId')
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error in getActiveSessions controller:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function getCompletedSessions(req, res) {
  try {
    const userId = req.user._id;

    // get sessions where the user is the host or participant
    const sessions = await Session.find({
      status: 'completed',
      $or: [{ host: userId }, { participants: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error in getCompletedSessions controller:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function getSessionsById(req, res) {
  try {
    const { id } = req.params;
    const session = await Session.findById(id)
      .populate('host', 'name  email profileImage clerkId')
      .populate('participants', 'name  email profileImage clerkId');

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }
    res.status(200).json(session);
  } catch (error) {
    console.log('Error in getSessionById controller', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    // check if session is already full - has participant.
    if (session.participants) {
      return res.status(400).json({ message: 'Session is already full.' });
    }

    session.participants = userId;
    await session.save();

    const channel = chatClient.channel(message, session.callId);

    await channel.addMembers([clerkId]);

    res.status(200).json({ message: 'Session joined successfully.', session });
  } catch (error) {
    console.error('Error in joinSession controller:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    // check id the user is the host
    if (session.host.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: 'Only the host can end this session.' });
    }

    // check if the session is already ended

    if (session.status === 'completed') {
      return res.status(400).json({ message: 'Session already completed.' });
    }

    session.status = 'completed';
    await session.save();

    // delete stream video call
    const call = streamClient.video.call('default', session.callId);
    await call.delete({ hard: true });

    // delete stream chat channel
    const channel = chatClient.channel('messages', session.callId);
    await channel.delete();

    res.status(200).json({ message: 'Session ended successfully.', session });
  } catch (error) {
    console.error('Error in endSession controller:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
