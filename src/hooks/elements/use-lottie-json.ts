import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryKeys } from '~/hooks/query-keys';

export const useLottieJson = (url: string) => {
  return useQuery({
    queryKey: queryKeys.lottie(url),
    queryFn: async () => {
      const response = await axios.get(url);

      return response.data;
    },
    staleTime: Infinity,
  });
};
