import * as Sentry from '@sentry/react';
import { useQuery } from '@tanstack/react-query';
import { authKeys } from '~/hooks/query-keys';
import { AuthUserSchema } from '~/types/schemas/auth';
import { apiClient } from '~/utils/axios/axios';

export function useAuthUser({ enabled = false } = {}) {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      const response = await apiClient.get('/me');

      const user = AuthUserSchema.parse(response.data);

      Sentry.setUser({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      return user;
    },
    staleTime: Infinity,
    enabled,
  });
}
