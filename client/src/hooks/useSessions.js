import { useMutaion, useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { act } from 'react';
import { sessionApi } from '../api/sessions';

export const useCreatSession = () => {
  const result = useMutaion({
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

export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ['activeSessions'],
    queryFn: sessionApi.getActiveSession,
  });
  return result;
};
export const useyResentSessions = () => {
  const result = useQuery({
    queryKey: ['myResentSessions'],
    queryFn: sessionApi.getMyResentSession,
  });
  return result;
};
export const useySessionById = (id) => {
  const result = useQuery({
    queryKey: ['session', id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: 5000, // refetch every 5 seconds to detect session status changes
  });
  return result;
};

export const useJoinSession = (id) => {
  const result = useMutaion({
    mutationKey: ['joinSession'],
    mutationFn: () => sessionApi.joinSession(id),
    onSuccess: () => {
      toast.success('Joined session successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to join session');
    },
  });
  return result;
};
export const useEndSession = (id) => {
  const result = useMutaion({
    mutationKey: ['endSession'],
    mutationFn: () => sessionApi.endSession(id),
    onSuccess: () => {
      toast.success('Ended session successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to end session');
    },
  });
  return result;
};
