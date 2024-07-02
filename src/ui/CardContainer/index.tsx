import React from 'react';

type Props = {
  children: React.ReactNode;
};

export function CardContainer({ children }: Props) {
  return <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">{children}</div>;
}
