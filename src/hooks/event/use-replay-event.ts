import { useMutation } from '@tanstack/react-query';
import { apiClient } from '~/utils/axios/axios';

export function useReplayEvent() {
  return useMutation((eventId: string) => {
    return apiClient.post(`/events/${eventId}/replay`);
  });
}
