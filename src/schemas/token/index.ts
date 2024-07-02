import { z } from 'zod';

export const TokenSchema = z.object({
  email: z.string().email(),
  token: z.string(),
  expires: z.coerce.date(),
});
