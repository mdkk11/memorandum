import { v4 as uuidv4 } from 'uuid';
import { createVerificationToken } from '@/services/token/email/createVerificationToken';
import { deleteVerificationToken } from '@/services/token/email/deleteVerificationToken';
import { getVerificationToken } from '@/services/token/email/getVerificationToken';
import { createPasswordResetToken } from '@/services/token/password/createPasswordResetToken';
import { deletePasswordResetToken } from '@/services/token/password/deletePasswordResetToken';
import { getPasswordResetToken } from '@/services/token/password/getPasswordResetToken';

export const generateVerificationToken = async ({ email }: { email: string }) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const { verificationToken: existingToken } = await getVerificationToken({ email });

  if (existingToken) {
    await deleteVerificationToken({ id: existingToken.id });
  }

  return await createVerificationToken({ email, token, expires });
};

export const generatePasswordResetToken = async ({ email }: { email: string }) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const { passwordResetToken: existingToken } = await getPasswordResetToken({ email });

  if (existingToken) {
    await deletePasswordResetToken({ id: existingToken.id });
  }

  return await createPasswordResetToken({ email, token, expires });
};
