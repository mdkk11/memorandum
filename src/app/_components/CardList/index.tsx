import React, { ComponentPropsWithoutRef } from 'react';

export const CardList = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto w-full @container">{children}</div>;
};

CardList.Container = function CardListContainer({ children }: { children: React.ReactNode }) {
  return <ul className="grid gap-6 @md:grid-cols-1 @4xl:grid-cols-3">{children}</ul>;
};

CardList.ItemContainer = function CardListItemContainer({ children }: { children: React.ReactNode }) {
  return <div className="relative grid gap-5 rounded-md border bg-white p-3 shadow hover:bg-accent">{children}</div>;
};

CardList.ItemHeader = function CardListItemHeader({ ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div {...props} />;
};

CardList.ItemFooter = function CardListItemFooter({ ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div {...props} />;
};
