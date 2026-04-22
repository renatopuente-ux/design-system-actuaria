import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BadgeCount } from './BadgeCount';

const meta: Meta<typeof BadgeCount> = {
  title: 'Components/BadgeCount',
  component: BadgeCount,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 0, max: 200 } },
    max: { control: { type: 'number', min: 1, max: 999 } },
    color: { control: 'color' },
  },
};
export default meta;
type Story = StoryObj<typeof BadgeCount>;

export const Default: Story = {
  args: {
    count: 5,
    max: 99,
  },
};

export const OverMax: Story = {
  args: {
    count: 142,
    max: 99,
  },
};

export const SingleDigit: Story = {
  args: {
    count: 3,
  },
};

export const Zero: Story = {
  args: {
    count: 0,
  },
};

/** Simulates unread alerts in the dashboard notification center */
export const UnreadAlerts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <span style={{ fontSize: 14 }}>Alertas de reserva</span>
      <BadgeCount count={7} />
    </div>
  ),
};

/** Simulates pending policy renewals counter in sidebar nav */
export const PendingRenewals: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <span style={{ fontSize: 14 }}>Renovaciones pendientes</span>
      <BadgeCount count={134} max={99} />
    </div>
  ),
};
