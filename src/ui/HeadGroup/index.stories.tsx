import { Button } from '../Button';
import { Heading } from '../Heading';
import { HeadGroup } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: HeadGroup,
  args: {
    children: (
      <>
        <Heading className="grow" level={'h1'}>
          見出し見出し
        </Heading>
        <Button size="sm" variant={'default'}>
          詳細へ
        </Button>
      </>
    ),
  },
} satisfies Meta<typeof HeadGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
