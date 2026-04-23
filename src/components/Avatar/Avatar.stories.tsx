import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['Photo', 'Icon', 'Initials', 'Logo'] },
    size: { control: 'select', options: ['Small', 'Medium', 'Large'] },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const AllSizesPhoto: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['Small', 'Medium', 'Large'] as const).map((size) => (
        <Avatar key={size} type="Photo" size={size} src="https://i.pravatar.cc/64" alt="Usuario" />
      ))}
    </div>
  ),
};

export const AllSizesIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['Small', 'Medium', 'Large'] as const).map((size) => (
        <Avatar key={size} type="Icon" size={size} />
      ))}
    </div>
  ),
};

export const AllSizesInitials: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['Small', 'Medium', 'Large'] as const).map((size) => (
        <Avatar key={size} type="Initials" size={size} initials="RP" />
      ))}
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['Small', 'Medium', 'Large'] as const).map((size) => (
        <Avatar key={size} type="Initials" size={size} initials="RP" status />
      ))}
    </div>
  ),
};

export const WithNotification: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['Small', 'Medium', 'Large'] as const).map((size) => (
        <Avatar key={size} type="Initials" size={size} initials="RP" notification />
      ))}
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Avatar type="Icon" size="Medium" />
      <Avatar type="Initials" size="Medium" initials="AD" />
      <Avatar type="Photo" size="Medium" src="https://i.pravatar.cc/64" alt="Foto" />
      <Avatar type="Logo" size="Medium" src="https://i.pravatar.cc/64" alt="Logo" />
    </div>
  ),
};
