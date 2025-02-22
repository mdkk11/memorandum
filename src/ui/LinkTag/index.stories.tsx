import { LinkTag } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: LinkTag,
  args: { linkProps: { href: '/path' }, children: 'タグ' },
} satisfies Meta<typeof LinkTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: { variant: 'destructive' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};
