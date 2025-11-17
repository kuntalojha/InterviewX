import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
// import controllers
import {
  createSession,
  endSession,
  getActiveSessions,
  getCompletedSessions,
  getSessionsById,
  joinSession,
} from '../controllers/session.controller.js';

const router = express.Router();

router.post('/', protectRoute, createSession);
router.get('/active', protectRoute, getActiveSessions);
router.get('/completed', protectRoute, getCompletedSessions);

router.get('/:id', protectRoute, getSessionsById);
router.post('/:id/join', protectRoute, joinSession);
router.post('/:id/end', protectRoute, endSession);

export default router;
