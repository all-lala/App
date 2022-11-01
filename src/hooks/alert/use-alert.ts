import { useQuery } from '@tanstack/react-query';
import * as z from 'zod';
import { alertKeys } from '~/hooks/query-keys';
import { AlertThemeSchema } from '~/types/schemas/alert';
import { apiClient } from '~/utils/axios/axios';

export const useAlert = (alertId: string) => {
  return useQuery(
    alertKeys.detail(alertId),
    async () => {
      const { data } = await apiClient.get(`/alerts/${alertId}`);

      if (!data) {
        return null;
      }

      const userEmbedSchema = z.object({
        user: z.object({
          username: z.string(),
        }),
      });

      return data;
    },
    {
      staleTime: Infinity,
    }
  );
};
