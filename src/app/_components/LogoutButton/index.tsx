import { ComponentPropsWithoutRef } from 'react';
import { signOut } from 'next-auth/react';
import { cn } from '@/libs/utils';

type Props = Omit<ComponentPropsWithoutRef<'button'>, 'onClick'>;

export const LogoutButton = ({ className, ...props }: Props) => {
  const logOut = async () => {
    await signOut();
  };
  return (
    <button className={cn('w-full text-left', className)} onClick={() => void logOut()} {...props}>
      ログアウト
    </button>
  );
};
