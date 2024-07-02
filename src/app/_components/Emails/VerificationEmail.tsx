import * as React from 'react';
import { Body, Section, Head, Html, Preview, Text, Tailwind } from '@react-email/components';
import { Header, Container, Heading, Separator, Button, Link } from './components';

type Props = {
  name: string;
  email: string;
  verificationLink: string;
  appUrl: string;
};

export default function VerificationEmail({ name, email, verificationLink, appUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>メールアドレスの確認のご連絡</Preview>
      <Tailwind>
        <Body className="m-auto bg-white px-2 font-sans">
          <Container>
            <Header appUrl={appUrl} />
            <Separator />
            <Heading>メールアドレスの確認</Heading>
            <Text className="text-sm leading-5 text-black">
              <strong>{name}</strong> さん <span className="text-sm text-black/60">({email})</span>
            </Text>{' '}
            <Text className="text-sm leading-4 text-black">
              <strong>Memorandum</strong>を始めるには、以下の<strong>メールアドレスを確認</strong>をクリックして下さい。
            </Text>
            <Section className="my-12 text-center">
              <Button href={verificationLink}>メールアドレスを確認</Button>
            </Section>
            <Text className="text-sm leading-4 text-black">または、以下のURLをブラウザにコピーして貼り付けてください。</Text>
            <Link href={verificationLink}>{verificationLink}</Link>
            <Separator />
            <Text className="text-xs leading-4 text-[#666666]">
              このメールは <span className="text-black">{name}</span> さん向けに送信されました。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

VerificationEmail.PreviewProps = {
  name: 'mocomichi',
  email: 'mk.eng1110@gmail.com',
  verificationLink: 'https://vercel.com/teams/invite/foo',
  appUrl: '/',
} as Props;
