import { z } from 'zod';

export const ModelSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  phone: z.string().min(1),
  location: z.string().min(1),
  hasLocation: z.boolean(),
  category: z.enum(['modelo', 'tradutora', 'massagista']),
  description: z.string(),
  age: z.number().int().positive(),
  height: z.string(),
  size: z.string(),
  shoes: z.string(),
  hip: z.string(),
  eyeColor: z.string(),
  accompanies: z.array(z.string()),
  fee: z.string(),
  acceptsCard: z.boolean(),
  photos: z.array(z.string().url()),
  videos: z.array(z.string().url()).nullable().transform((val) => val ?? []),
  instagram: z.string().nullable(),
  twitter: z.string().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Model = z.infer<typeof ModelSchema>;

