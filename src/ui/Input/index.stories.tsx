import { Input } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type {} from '@storybook/addon-interactions';

const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
