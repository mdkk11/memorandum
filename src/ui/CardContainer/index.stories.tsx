import { PhotoCard } from '../PhotoCard';
import { CardContainer } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const args = {
  alt: 'タイトル',
  src: '/assets/images/photo-example.jpg',
};

const meta = {
  component: CardContainer,
} satisfies Meta<typeof CardContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: Array.from({ length: 12 }).map((_, i) => <PhotoCard key={i} {...args} />),
  },
};
