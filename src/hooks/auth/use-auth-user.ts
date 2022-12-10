import { useQuery } from '@tanstack/react-query';
import { authKeys } from '~/hooks/query-keys';
import { AuthUserSchema } from '~/types/schemas/auth';
import { apiClient } from '~/utils/axios/axios';

export function useAuthUser({ enabled = false } = {}) {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      const response = await apiClient.get('/me');

      return AuthUserSchema.parse(response.data);
    },
    staleTime: Infinity,
    enabled,
  });
}
