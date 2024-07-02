import React, { ComponentProps } from 'react';
import { Button } from '@/ui/Button';

type Props = {
  url: string;
  onClickOpenInput: ComponentProps<typeof Button>['onClick'];
  onClickUnLink: ComponentProps<typeof Button>['onClick'];
};

export const UrlManager = ({ url, onClickOpenInput, onClickUnLink }: Props) => {
  return (
    <div className="grid gap-3 rounded-md border bg-slate-50 p-3">
      <a className="text-sm !text-muted-foreground" href={url} rel="noreferrer noopener" target="_blank">
        {url}
      </a>
      <div className="flex gap-3">
        <Button onClick={onClickOpenInput} size={'sm'} type="button">
          URLを編集
        </Button>
        <Button onClick={onClickUnLink} size={'sm'} type="button" variant={'outline'}>
          解除
        </Button>
      </div>
    </div>
  );
};
