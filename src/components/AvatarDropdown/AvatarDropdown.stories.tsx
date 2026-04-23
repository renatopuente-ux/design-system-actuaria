import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AvatarDropdown } from './AvatarDropdown';

const meta: Meta<typeof AvatarDropdown> = {
  title: 'Components/AvatarDropdown',
  component: AvatarDropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['Button', 'Navigation side'] },
  },
};
export default meta;
type Story = StoryObj<typeof AvatarDropdown>;

export const ButtonDefault: Story = {
  args: { type: 'Button', name: 'Renato Puente', initials: 'RP' },
};

export const ButtonHover: Story = {
  args: { type: 'Button', name: 'Renato Puente', initials: 'RP' },
  parameters: { pseudo: { hover: true } },
};

export const ButtonOpen: Story = {
  args: { type: 'Button', name: 'Renato Puente', initials: 'RP', open: true },
};

export const ButtonFocused: Story = {
  args: { type: 'Button', name: 'Renato Puente', initials: 'RP' },
  parameters: { pseudo: { focusVisible: true } },
};

export const ButtonDisabled: Story = {
  args: { type: 'Button', name: 'Renato Puente', initials: 'RP', disabled: true },
};

export const NavigationSideDefault: Story = {
  args: { type: 'Navigation side', name: 'Renato Puente', initials: 'RP' },
};

export const NavigationSideHover: Story = {
  args: { type: 'Navigation side', name: 'Renato Puente', initials: 'RP' },
  parameters: { pseudo: { hover: true } },
};

export const AllButtonStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      <AvatarDropdown type="Button" name="Default" initials="RP" />
      <AvatarDropdown type="Button" name="Open" initials="RP" open />
      <AvatarDropdown type="Button" name="Disabled" initials="RP" disabled />
      <AvatarDropdown type="Navigation side" name="Navigation side" initials="RP" />
    </div>
  ),
};
