import { z } from 'zod';

export const FileType = {
  Image: 0,
  Video: 1,
  Audio: 2,
  Lottie: 3,
} as const;

export const fileSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(FileType),
  created_at: z.string(),
  updated_at: z.string(),
  user_id: z.string(),
  file: z.object({
    extname: z.string(),
    mimeType: z.string(),
    name: z.string(),
    size: z.number(),
    url: z.string(),
  }),
});

export type FileItem = z.infer<typeof fileSchema>;
