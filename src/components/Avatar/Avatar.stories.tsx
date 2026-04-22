import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithInitials: Story = {
  args: { name: 'Renato Puente', size: 'md' },
};

export const WithImage: Story = {
  args: {
    name: 'Renato Puente',
    src: 'https://i.pravatar.cc/64',
    size: 'md',
  },
};

export const SingleName: Story = {
  args: { name: 'Actuaria', size: 'lg' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} name="Renato Puente" size={size} />
      ))}
    </div>
  ),
};

export const CustomColor: Story = {
  args: { name: 'Juan García', size: 'md', color: '#151f47' },
};
