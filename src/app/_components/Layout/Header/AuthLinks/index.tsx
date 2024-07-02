import { LinkButton } from '@/ui/LinkButton';

/**
 * @package
 */
export const AuthLinks = () => {
  return (
    <div className="flex gap-2">
      <LinkButton href={'/signin'} variant={'default'}>
        ログイン
      </LinkButton>
      <LinkButton href={'/signup'} variant={'secondary'}>
        会員登録
      </LinkButton>
    </div>
  );
};
