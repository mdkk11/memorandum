import React from 'react';
import { Heading as ReactEmailHeading } from '@react-email/components';

export const Heading = ({ children }: { children: React.ReactNode }) => {
  return <ReactEmailHeading className="mx-0 my-[30px] p-0 text-center text-xl font-bold text-black">{children}</ReactEmailHeading>;
};
