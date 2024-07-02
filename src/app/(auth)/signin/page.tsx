import Footer from '@/app/(auth)/_components/Footer';
import { OAuthForm } from '@/app/(auth)/_components/OAuthForm';
import { Heading } from '@/ui/Heading';
import { Section } from '@/ui/Section';
import { Separator } from '@/ui/Separator';
import { SignInForm } from './_components/SignInForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ログイン',
};

export default function SignIsnPage() {
  return (
    <Section className="grid gap-10">
      <Heading bold level="h2" size="xxl">
        ログイン
      </Heading>
      <div className="grid gap-10">
        <OAuthForm />
        <Separator text="or" />
        <SignInForm />
      </div>
      <Footer>
        <Footer.Link aria-label="Sign Up" href="/signup">
          アカウントがない場合
        </Footer.Link>
      </Footer>
    </Section>
  );
}
