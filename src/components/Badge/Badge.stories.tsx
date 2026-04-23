import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from './Badge';
import type { BadgeTone } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['Error', 'Warning', 'Success', 'Information', 'Neutral', 'Brand'],
    },
    size: { control: 'radio', options: ['Medium', 'Small'] },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

const TONES: BadgeTone[] = ['Error', 'Warning', 'Success', 'Information', 'Neutral', 'Brand'];

const TONE_LABELS: Record<BadgeTone, string> = {
  Error:       'Error',
  Warning:     'Advertencia',
  Success:     'Exitoso',
  Information: 'Información',
  Neutral:     'Neutral',
  Brand:       'Marca',
};

// ── Default / playground ───────────────────────────────────────
export const Default: Story = {
  args: {
    tone:     'Information',
    size:     'Medium',
    children: 'Información',
    icon:     true,
  },
};

// ── All tones — Medium ─────────────────────────────────────────
export const AllTonesMedium: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {TONES.map((tone) => (
        <Badge key={tone} tone={tone} size="Medium" icon>
          {TONE_LABELS[tone]}
        </Badge>
      ))}
    </div>
  ),
};

// ── All tones — Small ──────────────────────────────────────────
export const AllTonesSmall: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {TONES.map((tone) => (
        <Badge key={tone} tone={tone} size="Small" icon>
          {TONE_LABELS[tone]}
        </Badge>
      ))}
    </div>
  ),
};

// ── Without icon ──────────────────────────────────────────────
export const NoIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {TONES.map((tone) => (
        <Badge key={tone} tone={tone} size="Medium">
          {TONE_LABELS[tone]}
        </Badge>
      ))}
    </div>
  ),
};

// ── With badge dot ─────────────────────────────────────────────
export const WithBadgeDot: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {TONES.map((tone) => (
        <Badge key={tone} tone={tone} size="Medium" icon badgeDot>
          {TONE_LABELS[tone]}
        </Badge>
      ))}
    </div>
  ),
};

// ── Individual tone stories ────────────────────────────────────
export const ErrorMedium: Story = {
  args: { tone: 'Error', size: 'Medium', children: 'Error', icon: true },
};

export const WarningMedium: Story = {
  args: { tone: 'Warning', size: 'Medium', children: 'Advertencia', icon: true },
};

export const SuccessMedium: Story = {
  args: { tone: 'Success', size: 'Medium', children: 'Exitoso', icon: true },
};

export const InformationMedium: Story = {
  args: { tone: 'Information', size: 'Medium', children: 'Información', icon: true },
};

export const NeutralMedium: Story = {
  args: { tone: 'Neutral', size: 'Medium', children: 'Neutral', icon: true },
};

export const BrandMedium: Story = {
  args: { tone: 'Brand', size: 'Medium', children: 'Marca', icon: true },
};
