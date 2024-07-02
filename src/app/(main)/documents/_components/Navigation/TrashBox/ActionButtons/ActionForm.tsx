import React, { ComponentPropsWithoutRef } from 'react';

export const ActionForm = ({ ...props }: ComponentPropsWithoutRef<'form'>) => {
  return <form className="grid place-items-center rounded-sm hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600" {...props} />;
};
