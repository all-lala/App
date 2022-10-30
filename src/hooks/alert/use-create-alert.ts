import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { queryKeys } from '~/hooks/query-keys';
import { apiClient } from '~/utils/axios/axios';

export function useCreateAlert() {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: { title: string; type: number }) => {
      const { data } = await apiClient.post('/alerts', params);

      toastr(
        ToastType.Success,
        'Your alert is created!',
        'Congratulation! You can custom your alert now 👍'
      );

      return data;
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(queryKeys.alerts());
      },
    }
  );
}
