'use client';

import { type OAuthProviderType } from '@auth/core/providers/oauth-types';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/libs/routes';
import { AlertText } from '@/ui/AlertText';
import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icons';
import { Icons } from '@/ui/Icons/assets';

const oauthProviders = [
  { name: 'Google', strategy: 'google', icon: 'google' },
  { name: 'Github', strategy: 'github', icon: 'github' },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
  strategy: OAuthProviderType;
}[];

export const OAuthForm = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'このメールアドレスは既に別のプロバイダーで登録されています。' : '';

  return (
    <div className="grid grid-cols-1 gap-4">
      {oauthProviders.map((provider) => {
        return (
          <Button
            key={provider.strategy}
            onClick={() =>
              void signIn(provider.strategy, {
                callbackUrl: DEFAULT_LOGIN_REDIRECT,
              })
            }
            variant="outline"
          >
            <Icon className="mr-2 size-4" type={provider.icon} />
            {provider.name}
          </Button>
        );
      })}
      {error && (
        <div className="rounded-md bg-red-100 p-2.5">
          <AlertText>{error}</AlertText>
        </div>
      )}
    </div>
  );
};
