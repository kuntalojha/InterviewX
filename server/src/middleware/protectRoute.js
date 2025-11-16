import { requireAuth } from '@clerk/express';
import User from '../models/User.model.js';

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) {
        return res
          .status(401)
          .json({ message: 'Unauthorized - invalid token.' });
      }

      // Find user in our database
      const user = await User.findOne({ clerkId });
      if (!user) {
        return res.status(401).json({ message: 'User not found.' });
      }

      // attach user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error('Error in protectRoute middleware:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  },
];
