import { Button } from '../Button';
import { AlertDialogModal } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: AlertDialogModal,
  args: {
    title: '削除確認',
  },
} satisfies Meta<typeof AlertDialogModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    messageNode: '本当に削除しますか？',
    actionsNode: (
      <>
        <Button variant={'outline'}>キャンセル</Button>
        <Button>はい</Button>
      </>
    ),
  },
};
