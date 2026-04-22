import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Logotipo } from './Logotipo';

const meta: Meta<typeof Logotipo> = {
  title: 'Components/Logotipo',
  component: Logotipo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['full', 'icon'] },
    theme: { control: 'select', options: ['light', 'dark'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof Logotipo>;

export const FullLight: Story = {
  args: { variant: 'full', theme: 'light', size: 'md' },
};

export const FullDark: Story = {
  args: { variant: 'full', theme: 'dark', size: 'md' },
  decorators: [
    (Story) => (
      <div style={{ background: '#151f47', padding: 24, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

export const IconOnly: Story = {
  args: { variant: 'icon', theme: 'light', size: 'md' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Logotipo key={size} variant="full" theme="light" size={size} />
      ))}
    </div>
  ),
};

export const IconAllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Logotipo key={size} variant="icon" theme="light" size={size} />
      ))}
    </div>
  ),
};
