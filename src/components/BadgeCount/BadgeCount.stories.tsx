import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BadgeCount } from './BadgeCount';
import type { BadgeCountEmphasis } from './BadgeCount';

const meta: Meta<typeof BadgeCount> = {
  title: 'Components/BadgeCount',
  component: BadgeCount,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    emphasis: {
      control: 'radio',
      options: ['Strong', 'Moderate', 'Weak'],
    },
    count: { control: { type: 'number', min: 0, max: 200 } },
    max:   { control: { type: 'number', min: 1,   max: 999 } },
  },
};
export default meta;
type Story = StoryObj<typeof BadgeCount>;

const EMPHASES: BadgeCountEmphasis[] = ['Strong', 'Moderate', 'Weak'];

// ── Default / playground ───────────────────────────────────────
export const Default: Story = {
  args: { count: 8, emphasis: 'Strong' },
};

// ── All emphasis levels ────────────────────────────────────────
export const AllEmphases: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {EMPHASES.map((emphasis) => (
        <BadgeCount key={emphasis} count={8} emphasis={emphasis} />
      ))}
    </div>
  ),
};

// ── Over max ───────────────────────────────────────────────────
export const OverMax: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {EMPHASES.map((emphasis) => (
        <BadgeCount key={emphasis} count={142} max={99} emphasis={emphasis} />
      ))}
    </div>
  ),
};

// ── Individual stories ─────────────────────────────────────────
export const Strong: Story = {
  args: { count: 8, emphasis: 'Strong' },
};

export const Moderate: Story = {
  args: { count: 8, emphasis: 'Moderate' },
};

export const Weak: Story = {
  args: { count: 8, emphasis: 'Weak' },
};

// ── Usage: notification badge in nav ──────────────────────────
export const NavNotification: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'Nunito, sans-serif', fontSize: 14 }}>
      <span>Alertas de reserva</span>
      <BadgeCount count={7} emphasis="Strong" />
    </div>
  ),
};

export const NavPending: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'Nunito, sans-serif', fontSize: 14 }}>
      <span>Renovaciones pendientes</span>
      <BadgeCount count={134} max={99} emphasis="Moderate" />
    </div>
  ),
};
