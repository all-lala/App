import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from '~/hooks/query-keys';
import { apiClient } from '~/utils/axios/axios';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return apiClient.post('/auth/logout');
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(authKeys.root);
        void queryClient.setQueryData(authKeys.user(), null);
      },
    }
  );
}
