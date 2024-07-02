import { Resend } from 'resend';
import PasswordResetEmail from '@/app/_components/Emails/PasswordReset';
import VerificationEmail from '@/app/_components/Emails/VerificationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const appUrl = '';
const headers = {
  'X-Entity-Ref-ID': new Date().getTime() + '',
};
const BaseUrl = process.env.NEXT_PUBLIC_URL;

export const sendVerificationEmail = async (name: string, email: string, token: string) => {
  const verificationLink = `${BaseUrl}/email-verification?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'メールアドレスの確認',
    react: VerificationEmail({ name, email, verificationLink, appUrl }),
    headers,
  });
};

export const sendPasswordResetEmail = async (name: string, email: string, token: string) => {
  const resetLink = `${BaseUrl}/password-reset?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'パスワードのリセット',
    react: PasswordResetEmail({ name, email, resetLink, appUrl }),
    headers,
  });
};
