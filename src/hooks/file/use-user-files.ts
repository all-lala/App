import { useQuery } from '@tanstack/react-query';
import { apiClient } from '~/utils/axios/axios';
import { fileKeys } from './../query-keys';

export const useUserFiles = () => {
  return useQuery({
    queryKey: fileKeys.lists(),
    queryFn: async () => {
      const { data } = await apiClient.get('/media');

      return data;
    },
    staleTime: Infinity,
  });
};
