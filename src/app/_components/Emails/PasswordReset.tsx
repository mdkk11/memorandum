/* eslint-disable react/no-unescaped-entities */
import { Body, Head, Html, Preview, Section, Tailwind, Text } from '@react-email/components';
import { Button, Container, Header, Heading, Separator } from './components';

type Props = {
  name: string;
  email: string;
  resetLink: string;
  appUrl: string;
};

export default function PasswordResetEmail({ email, resetLink, name, appUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>パスワードのリセットのご連絡</Preview>
      <Tailwind>
        <Body className="m-auto bg-white px-2 font-sans">
          <Container>
            <Header appUrl={appUrl} />
            <Separator />
            <Heading>パスワードのリセット</Heading>
            <Text className="text-sm leading-5 text-black">
              <strong>{name}</strong> さん <span className="text-sm text-black/60">({email})</span>
            </Text>{' '}
            <Text className="text-sm leading-5 text-black">
              パスワード変更がリクエストされました。以下の<strong>パスワードのリセット</strong>をクリックすると新しいパスワードを設定できます。
            </Text>
            <Section className="my-12 text-center">
              <Button href={resetLink}>パスワードのリセット</Button>
            </Section>
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

PasswordResetEmail.PreviewProps = {
  name: 'mocomichi',
  email: 'mk.eng1110@gmail.com',
  resetLink: 'https://vercel.com/teams/invite/foo',
  appUrl: '/',
} as Props;
