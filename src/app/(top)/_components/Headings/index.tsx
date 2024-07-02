import { AppConfig } from '@/app.config';
import { Heading } from '@/ui/Heading';
import { Icons } from '@/ui/Icons/assets';
import { LinkButton } from '@/ui/LinkButton';
import type { Session } from 'next-auth';

type Props = {
  session: Session | null;
};

export const Headings = ({ session }: Props) => {
  return (
    <div className="max-w-3xl space-y-10 text-center">
      <Heading bold className="sm:text-5xl md:text-6xl" level="h1" size={'xxxl'}>
        Your Ideas, Documents, & Plans. Unified. Welcome to &nbsp;
        <span className="underline">{AppConfig.title}</span>
      </Heading>
      <Heading className="font-medium sm:text-xl md:text-2xl" level="h3" size={'md'}>
        {AppConfig.title} allows you to make messy notes for yourself.
      </Heading>
      {session && (
        <LinkButton className="" href="/documents" variant={'default'}>
          Enter {AppConfig.title}
          <Icons.arrowRight className="stroke-white" />
        </LinkButton>
      )}
    </div>
  );
};
