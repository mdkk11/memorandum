import { Icons } from '../Icons/assets';
import { Button } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Button,
  args: { children: '確認する' },
} satisfies Meta<typeof Button>;

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

export const Link: Story = {
  args: { variant: 'link' },
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

export const Icon: Story = {
  args: { size: 'icon', children: <Icons.arrowLeft />, variant: 'outline' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
