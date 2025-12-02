import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from '../hooks/useSessions';

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({
    problem: '',
    difficulty: '',
  });

  const createSessionMutation = useCreateSession();
  const { data: activeSessionData, isLoading: loadingActiveSessions } =
    useActiveSessions();
  const { data: recentSessionData, isLoading: loadingRecentSessions } =
    useMyRecentSessions();

  console.log(activeSessionData);
  console.log(recentSessionData);
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default DashboardPage;
