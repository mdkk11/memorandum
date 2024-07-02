'use client';

import { ComponentProps } from 'react';
import Link from 'next/link';
import { LogoutButton } from '@/app/_components/LogoutButton';
import { Avatar } from '@/ui/Avatar';
import Dropdown from '@/ui/Dropdown';

type Props = Pick<ComponentProps<typeof Avatar>, 'avatarImageUrl'>;

/**
 * @package
 */
export const Menu = ({ avatarImageUrl }: Props) => {
  return (
    <Dropdown>
      <Dropdown.Trigger aria-label="メニューを開く">
        <Avatar avatarImageUrl={avatarImageUrl} />
      </Dropdown.Trigger>
      <Dropdown.Content align="right">
        <Dropdown.ContentGroup>
          <Dropdown.ContentItem asChild>
            <Link className="" href={'/documents'}>
              マイページ
            </Link>
          </Dropdown.ContentItem>
          <Dropdown.ContentItem asChild>
            <LogoutButton />
          </Dropdown.ContentItem>
        </Dropdown.ContentGroup>
      </Dropdown.Content>
    </Dropdown>
  );
};
