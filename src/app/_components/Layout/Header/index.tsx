import { AuthLinks } from '@/app/_components/Layout/Header/AuthLinks';
import { Menu } from '@/app/_components/Layout/Header/Menu';
import { AppConfig } from '@/app.config';
import { LinkButton } from '@/ui/LinkButton';
import type { Session } from 'next-auth';

type Props = {
  session?: Session | null;
};

/**
 * @package
 */
export const Header = ({ session }: Props) => {
  return (
    <header className="flex h-20 w-full items-center justify-between gap-2 px-6">
      <LinkButton className="text-xl font-black hover:no-underline" href="/" variant={'link'}>
        {AppConfig.title}
      </LinkButton>
      {session ? <Menu avatarImageUrl={session.user.image} /> : <AuthLinks />}
    </header>
  );
};
