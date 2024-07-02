import type { ComponentProps, ReactNode } from 'react';
import React from 'react';

type Props = {
  title?: string;
  overlayProps?: ComponentProps<'div'>;
  messageNode: ReactNode;
  actionsNode: ReactNode;
};

export function AlertDialogModal({ title = '確認', overlayProps, messageNode, actionsNode }: Props) {
  return (
    <div className="fixed left-0 top-0 z-50 flex size-full flex-col items-center justify-center">
      <div {...overlayProps} className="fixed left-0 top-0 z-40 size-full bg-black/15" />
      <div
        aria-label={title}
        aria-modal="true"
        className="relative z-50 flex min-h-[190px] min-w-[380px] flex-col items-center justify-center rounded-lg bg-white shadow-md"
        role="alertdialog"
      >
        <p className="whitespace-pre-wrap p-4 text-center text-base">{messageNode}</p>
        <div className="flex justify-center gap-2">{actionsNode}</div>
      </div>
    </div>
  );
}
