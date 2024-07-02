import React, { useCallback, useState } from 'react';
import { Editor } from '@tiptap/react';
import { z } from 'zod';

const validateUrl = (url: string): boolean => {
  return z.string().url().safeParse(url).success;
};

export type Props = {
  editor: Editor;
};

export const useBubbleLink = ({ editor }: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [url, setUrl] = useState('');

  const handleClickApplyUrl = useCallback(() => {
    if (!validateUrl(url)) {
      window.alert('無効なURLです');
      setIsShow(false);
      setUrl('');
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    setIsShow(false);
    setUrl('');
  }, [editor, url]);

  const handleChangeUrl = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);

  const handleClickUnlink = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
  }, [editor]);

  const handleClickOpenInput = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href || '';
    setIsShow(true);
    setUrl(previousUrl);
  }, [editor]);

  return { isShow, url, handleClickApplyUrl, handleChangeUrl, handleClickUnlink, handleClickOpenInput };
};
