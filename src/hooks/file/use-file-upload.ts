import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastr, ToastType } from '~/components/toast/toast';
import { apiClient } from '~/utils/axios/axios';
import { FileToType } from '~/utils/common/file-to-type';
import { fileKeys } from './../query-keys';

export function useFileUpload() {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: File) => {
      const media = new FormData();
      media.append('file', params);
      media.append('name', params.name);
      media.append('type', FileToType(params.type).toString());

      const { data } = await apiClient.post('/media', media);

      toastr(ToastType.Success, `File uploaded!`, `${params.name} is successfully uploaded!`);

      return data;
    },
    {
      onSuccess() {
        void queryClient.invalidateQueries(fileKeys.lists());
      },
    }
  );
}
