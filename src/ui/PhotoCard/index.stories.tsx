import { PhotoCard } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: PhotoCard,
  args: {
    alt: 'タイトル',
    src: '/assets/images/photo-example.jpg',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PhotoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Wide: Story = {
  args: {
    ratio: 'wide',
  },
};

export const Square: Story = {
  args: {
    ratio: 'square',
  },
};

export const Portrait: Story = {
  args: {
    ratio: 'portrait',
  },
};
