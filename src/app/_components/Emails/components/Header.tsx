import React from 'react';
import { Link, Section } from '@react-email/components';

export const Header = ({ appUrl }: { appUrl: string }) => {
  return (
    <Section>
      <Link className="py-2 text-xl font-bold text-black" href={appUrl}>
        Memorandum
      </Link>
    </Section>
  );
};
