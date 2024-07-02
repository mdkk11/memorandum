import React, { ComponentPropsWithoutRef } from 'react';
import NextLink from 'next/link';

type Props = {
  children: React.ReactNode;
};

const Footer = ({ children }: Props) => {
  return <div className="flex flex-wrap items-center justify-end gap-2">{children}</div>;
};

const Link = ({ ...props }: ComponentPropsWithoutRef<typeof NextLink>) => {
  return <NextLink className="text-sm text-black underline-offset-4 transition-colors hover:underline" {...props} />;
};

Footer.Link = Link;

export default Footer;
