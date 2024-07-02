import * as z from 'zod';

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  password: z.string().nullable(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});

export const AuthSchema = z.object({
  password: z.string(),
  email: z.string().email(),
});

export const SignInSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスは必須です',
  }),
  password: z
    .string()
    .min(6, {
      message: 'パスワードは6文字以上である必要があります',
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, {
      message: 'パスワードは6文字以上で、1つの大文字、1つの小文字、1つの数字を含む必要があります',
    }),
});

export const SignUpSchema = z.object({
  name: z.string().min(1, {
    message: '名前は必須です',
  }),
  email: z.string().email({
    message: 'メールアドレスは必須です',
  }),
  password: z
    .string()
    .min(6, {
      message: 'パスワードは6文字以上である必要があります',
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, {
      message: 'パスワードは6文字以上で、1つの大文字、1つの小文字、1つの数字を含む必要があります',
    }),
});
