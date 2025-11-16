export async function getStreamToken(req, res) {
  try {
    // use clerkid not mongo id
    // becouse it should be match with the stream user id
    const token = chatClient.createToken(req.user.clerkId);

    res.status(200).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.image,
    });
  } catch (error) {
    console.error('Error in getStreamToken controller:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
