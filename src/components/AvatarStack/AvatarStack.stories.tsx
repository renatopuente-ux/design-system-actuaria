import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AvatarStack } from './AvatarStack';

const meta: Meta<typeof AvatarStack> = {
  title: 'Components/AvatarStack',
  component: AvatarStack,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['Small', 'Medium', 'Large'] },
  },
};
export default meta;
type Story = StoryObj<typeof AvatarStack>;

const sampleAvatars = [
  { initials: 'RP', alt: 'Renato Puente' },
  { src: 'https://i.pravatar.cc/64?img=2', alt: 'Usuario 2' },
  { initials: 'MG', alt: 'María García' },
  { src: 'https://i.pravatar.cc/64?img=4', alt: 'Usuario 4' },
  { initials: 'JL', alt: 'Juan López' },
];

export const SmallDefault: Story = {
  args: { avatars: sampleAvatars, size: 'Small', maxVisible: 5, showCount: true, countLabel: '99+' },
};

export const MediumDefault: Story = {
  args: { avatars: sampleAvatars, size: 'Medium', maxVisible: 5, showCount: true, countLabel: '99+' },
};

export const LargeDefault: Story = {
  args: { avatars: sampleAvatars, size: 'Large', maxVisible: 5, showCount: true, countLabel: '99+' },
};

export const FewAvatars: Story = {
  args: {
    avatars: [
      { initials: 'RP', alt: 'Renato Puente' },
      { src: 'https://i.pravatar.cc/64?img=2', alt: 'Usuario 2' },
    ],
    size: 'Small',
    showCount: false,
  },
};
