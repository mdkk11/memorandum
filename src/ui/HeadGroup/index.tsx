import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const HeadGroup = ({ children }: Props) => {
  return <header className="flex items-center pb-4">{children}</header>;
};
