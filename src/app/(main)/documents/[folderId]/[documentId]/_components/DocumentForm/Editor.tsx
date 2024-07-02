'use client';

import { CharacterCount } from '@tiptap/extension-character-count';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { createLowlight, common } from 'lowlight';
import 'highlight.js/styles/github.css';
import { type UseFormSetValue } from 'react-hook-form';
import { MaxLengthText } from '@/app/(main)/documents/_components/MaxLengthText';
import { Limit } from '@/app/(main)/documents/_const';
import { AlertText } from '@/ui/AlertText';
import { BubbleLink } from './BubbleLink';
import { DocumentFormType } from './useDocumentForm';

type Props = {
  content: DocumentFormType['body'];
  onUpdate: UseFormSetValue<DocumentFormType>;
  error: string | undefined;
};

export const Editor = ({ content, onUpdate, error }: Props) => {
  const extensions = [
    StarterKit.configure({ codeBlock: false, heading: { levels: [2, 3] } }),
    CharacterCount.configure({ limit: Limit.body }),
    Link.configure({
      openOnClick: false,
    }),
    Placeholder.configure({
      placeholder: '本文を入力',
    }),
    CodeBlockLowlight.configure({
      lowlight: createLowlight(common),
    }),
  ];

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: 'p-2 md:p-4 min-h-[300px] focus-visible:outline-none',
      },
    },
    content,
    onUpdate: ({ editor }) => {
      const body = editor.getHTML();
      onUpdate('body', body);
    },
  });

  if (!editor) return false;

  return (
    <div className="markdown">
      <EditorContent editor={editor} />
      <MaxLengthText className="flex justify-end" length={editor.storage.characterCount.characters()} limit={Limit.body} />
      {error && <AlertText>{error}</AlertText>}
      <BubbleMenu
        editor={editor}
        shouldShow={({ from, to }) => {
          const isSelectLink = editor.isActive('link');
          const isSelectRange = from !== to;
          return isSelectLink || isSelectRange;
        }}
      >
        <BubbleLink editor={editor} />
      </BubbleMenu>
    </div>
  );
};
