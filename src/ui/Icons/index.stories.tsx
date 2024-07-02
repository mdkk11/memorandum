import { Icon, type Props } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Icon,
  args: {
    type: 'account',
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

function storyFactory(type: Props['type']): Story {
  return { args: { type } };
}

export const Account = storyFactory('account');
export const Alert = storyFactory('alert');
export const Camera = storyFactory('camera');
export const Comment = storyFactory('comments');
export const Gear = storyFactory('gear');
export const HeartBorder = storyFactory('heartBorder');
export const Heart = storyFactory('heart');
export const Home = storyFactory('home');
export const PaperPlane = storyFactory('paperPlane');
export const Photos = storyFactory('photos');
export const Upload = storyFactory('upload');
export const User = storyFactory('user');
export const Zoom = storyFactory('zoom');
export const Google = storyFactory('google');
export const Github = storyFactory('github');
export const Loader = storyFactory('loader');
export const CirclePlus = storyFactory('circlePlus');
export const File = storyFactory('file');
export const Folder = storyFactory('folder');
export const Plus = storyFactory('plus');
export const Menu = storyFactory('menu');
export const List = storyFactory('list');
export const Trash = storyFactory('trash');
export const Undo = storyFactory('undo');
export const Link = storyFactory('link');
export const SignIn = storyFactory('singIn');
export const Send = storyFactory('send');
