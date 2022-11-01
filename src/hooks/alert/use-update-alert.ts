import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { alertKeys } from '~/hooks/query-keys';
import { AlertTheme } from '~/types/schemas/alert';
import { apiClient } from '~/utils/axios/axios';

export function useUpdateAlert() {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: AlertTheme) => {
      const { data } = await apiClient.put(`/alerts/${params.id}`, params);

      toastr(
        ToastType.Success,
        'Your alert is updated!',
        'Congratulation! You can use your alert now 👍'
      );

      return data;
    },
    {
      onSuccess(_, params) {
        void queryClient.invalidateQueries(alertKeys.detail(params.id));
        void queryClient.invalidateQueries(alertKeys.lists());
      },
    }
  );
}
