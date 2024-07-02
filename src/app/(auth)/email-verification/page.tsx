import { Section } from '@/ui/Section';
import { EmailVerifyForm } from './_components/EmailVerifyForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'メールを確認',
};

export default function EmailVerifyPage() {
  return (
    <Section className="grid gap-10">
      <EmailVerifyForm />
    </Section>
  );
}
