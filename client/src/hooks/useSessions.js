import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { sessionApi } from '../api/sessions';

// Create session
export const useCreateSession = () => {
  const result = useMutation({
    mutationKey: ['createSession'],
    mutationFn: sessionApi.createSession,
    onSuccess: () => {
      toast.success('Session created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create session');
    },
  });
  return result;
};

// Active sessions
export const useActiveSessions = () => {
  return useQuery({
    queryKey: ['activeSessions'],
    queryFn: sessionApi.getActiveSession,
  });
};

// My recent sessions
export const useMyRecentSessions = () => {
  return useQuery({
    queryKey: ['myRecentSessions'],
    queryFn: sessionApi.getMyResentSession,
  });
};

// Get session by ID
export const useMySessionById = (id) => {
  return useQuery({
    queryKey: ['session', id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: 5000,
  });
};

// Join session
export const useJoinSession = (id) => {
  return useMutation({
    mutationKey: ['joinSession'],
    mutationFn: () => sessionApi.joinSession(id),
    onSuccess: () => {
      toast.success('Joined session successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to join session');
    },
  });
};

// End session
export const useEndSession = (id) => {
  return useMutation({
    mutationKey: ['endSession'],
    mutationFn: () => sessionApi.endSession(id),
    onSuccess: () => {
      toast.success('Ended session successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to end session');
    },
  });
};
