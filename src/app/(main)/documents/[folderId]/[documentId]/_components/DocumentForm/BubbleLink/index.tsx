import React from 'react';
import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icons';
import { UrlInput } from './UrlInput';
import { UrlManager } from './UrlManager';
import { Props, useBubbleLink } from './useBubbleLink';

export const BubbleLink = ({ editor }: Props) => {
  const { isShow, url, handleChangeUrl, handleClickApplyUrl, handleClickOpenInput, handleClickUnlink } = useBubbleLink({ editor });

  const isSelectedLink = editor.isActive('link');
  const previousUrl = editor.getAttributes('link').href;

  return (
    <>
      {isSelectedLink && !isShow && <UrlManager onClickOpenInput={handleClickOpenInput} onClickUnLink={handleClickUnlink} url={previousUrl} />}
      {isShow && <UrlInput onChange={handleChangeUrl} onClick={handleClickApplyUrl} value={url} />}
      {!isSelectedLink && !isShow && (
        <Button onClick={handleClickOpenInput} size={'icon'} type="button" variant={'outline'}>
          <Icon size={'sm'} type="link" />
        </Button>
      )}
    </>
  );
};
