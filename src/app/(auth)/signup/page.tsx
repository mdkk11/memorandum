import Footer from '@/app/(auth)/_components/Footer';
import { OAuthForm } from '@/app/(auth)/_components/OAuthForm';
import { SignUpForm } from '@/app/(auth)/signup/_components/SignUpForm';
import { Heading } from '@/ui/Heading';
import { Section } from '@/ui/Section';
import { Separator } from '@/ui/Separator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '新規登録',
};

export default function SignUpPage() {
  return (
    <Section className="grid gap-10">
      <Heading bold level="h2" size="xxl">
        会員登録
      </Heading>
      <div className="grid gap-10">
        <OAuthForm />
        <Separator text="or" />
        <SignUpForm />
      </div>
      <Footer>
        <Footer.Link aria-label="Sign In" href="/signin">
          アカウントを既に持っている場合
        </Footer.Link>
      </Footer>
    </Section>
  );
}
