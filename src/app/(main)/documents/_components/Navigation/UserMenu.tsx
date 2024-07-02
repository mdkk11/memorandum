'use client';

import React from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { LogoutButton } from '@/app/_components/LogoutButton';
import { Account } from '@/ui/Account';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui/DropDownMenu';

type Session = NonNullable<Awaited<ReturnType<typeof getSession>>>;

/**
 * @package
 */
export const UserMenu = React.memo(function UserMenu({ name, image, email }: Session['user']) {
  return (
    <div className="w-full max-w-[600px] p-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full overflow-hidden">
          <button className="w-full">
            <Account avatarImageUrl={image} name={name} textProps={{ className: 'truncate' }} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent alignOffset={-12} className="min-w-[300px]">
          <DropdownMenuLabel className="pb-2 text-xs text-gray-500">{email}</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link className="w-full" href={'/profile'}>
              <Account avatarImageUrl={image} name={name} />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
