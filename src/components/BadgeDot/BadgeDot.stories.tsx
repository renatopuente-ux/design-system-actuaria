import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BadgeDot } from './BadgeDot';
import type { BadgeDotType, BadgeDotSize } from './BadgeDot';

const meta: Meta<typeof BadgeDot> = {
  title: 'Components/BadgeDot',
  component: BadgeDot,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['Online', 'Busy', 'Away', 'Offline', 'Notification'],
    },
    size:    { control: 'radio',   options: ['Large', 'Medium', 'Small'] },
    outline: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof BadgeDot>;

const TYPES: BadgeDotType[] = ['Online', 'Busy', 'Away', 'Offline', 'Notification'];
const SIZES: BadgeDotSize[] = ['Large', 'Medium', 'Small'];

// ── Default / playground ───────────────────────────────────────
export const Default: Story = {
  args: { type: 'Online', size: 'Large', outline: false },
};

// ── All types × all sizes ──────────────────────────────────────
export const AllTypesAndSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, width: 56, color: 'rgba(0,9,51,0.45)' }}>{size}</span>
          {TYPES.map((type) => (
            <BadgeDot key={type} type={type} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ── With outline ───────────────────────────────────────────────
export const WithOutline: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'rgba(21,31,71,0.1)', padding: 16, borderRadius: 8 }}>
      {TYPES.map((type) => (
        <BadgeDot key={type} type={type} size="Large" outline />
      ))}
    </div>
  ),
};

// ── Individual type stories ────────────────────────────────────
export const Online: Story = {
  args: { type: 'Online', size: 'Large' },
};

export const Busy: Story = {
  args: { type: 'Busy', size: 'Large' },
};

export const Away: Story = {
  args: { type: 'Away', size: 'Large' },
};

export const Offline: Story = {
  args: { type: 'Offline', size: 'Large' },
};

export const Notification: Story = {
  args: { type: 'Notification', size: 'Large' },
};

// ── In context: avatar with status ────────────────────────────
export const AvatarWithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {TYPES.map((type) => (
        <div key={type} style={{ position: 'relative', width: 40, height: 40 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(21,31,71,0.19)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Nunito, sans-serif', fontSize: 14, color: 'rgba(0,9,51,0.65)',
          }}>AC</div>
          <span style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <BadgeDot type={type} size="Medium" outline />
          </span>
        </div>
      ))}
    </div>
  ),
};
