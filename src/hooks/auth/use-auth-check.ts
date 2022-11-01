import { useQuery } from '@tanstack/react-query';
import { authKeys } from '~/hooks/query-keys';
import { AuthCheckSchema } from '~/types/schemas/auth';
import { apiClient } from '~/utils/axios/axios';

export const useAuthCheck = () => {
  return useQuery(
    authKeys.check(),
    async () => {
      const response = await apiClient.get('/auth/check');

      return AuthCheckSchema.parse(response.data);
    },
    {
      staleTime: Infinity,
    }
  );
};
