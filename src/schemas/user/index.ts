import { z } from 'zod';

export const UpdateUserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().optional(),
  email: z.string().email().nullish(),
  emailVerified: z.coerce.date().nullish(),
  image: z.string().nullish(),
  password: z.string().nullish(),
  updatedAt: z.coerce.date().optional(),
});
