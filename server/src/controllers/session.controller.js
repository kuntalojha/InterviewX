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

export async function getActiveSessions(req, res) {}

export async function getCompletedSessions(req, res) {}

export async function getSessionsById(req, res) {}

export async function joinSession(req, res) {}

export async function endSession(req, res) {}
