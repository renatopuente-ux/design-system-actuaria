import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AvatarLabelled } from './AvatarLabelled';

const meta: Meta<typeof AvatarLabelled> = {
  title: 'Components/AvatarLabelled',
  component: AvatarLabelled,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['Small', 'Medium', 'Large'] },
  },
};
export default meta;
type Story = StoryObj<typeof AvatarLabelled>;

export const Small: Story = {
  args: { size: 'Small', initials: 'RP', name: 'Renato Puente' },
};

export const Medium: Story = {
  args: { size: 'Medium', initials: 'RP', name: 'Renato Puente', email: 'renato.puente@actuaria.com' },
};

export const Large: Story = {
  args: { size: 'Large', src: 'https://i.pravatar.cc/64', name: 'Renato Puente', email: 'renato.puente@actuaria.com' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AvatarLabelled size="Small" initials="RP" name="Renato Puente" />
      <AvatarLabelled size="Medium" initials="RP" name="Renato Puente" email="renato.puente@actuaria.com" />
      <AvatarLabelled size="Large" src="https://i.pravatar.cc/64" name="Renato Puente" email="renato.puente@actuaria.com" />
    </div>
  ),
};
