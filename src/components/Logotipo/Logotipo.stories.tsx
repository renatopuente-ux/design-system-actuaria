import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Logotipo } from './Logotipo';
import type { LogotipoVariant } from './Logotipo';

const meta: Meta<typeof Logotipo> = {
  title: 'Components/Logotipo',
  component: Logotipo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'Color',
        'Negativo',
        'Black',
        'ColorAlt',
        'ActuariaPlus',
        'ActuariaPlusNegativo',
        'IsoActuariaPlusColor',
        'IsoActuariaPlusNegativo',
      ] satisfies LogotipoVariant[],
    },
    width: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Logotipo>;

// ── Single variant controls ──────────────────────────────────────────────────

export const Playground: Story = {
  args: { variant: 'Color', width: 160 },
};

// ── All 8 variants in a grid ─────────────────────────────────────────────────

const LIGHT_VARIANTS: LogotipoVariant[] = ['Color', 'Black', 'ColorAlt', 'ActuariaPlus', 'IsoActuariaPlusColor'];
const DARK_VARIANTS: LogotipoVariant[] = ['Negativo', 'ActuariaPlusNegativo', 'IsoActuariaPlusNegativo'];

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'sans-serif' }}>
      {/* Light-background group */}
      <div style={{ background: '#ffffff', padding: 24, borderRadius: 12, display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
        {LIGHT_VARIANTS.map((v) => (
          <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Logotipo variant={v} width={160} />
            <span style={{ fontSize: 11, color: '#555' }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Dark-background group */}
      <div style={{ background: '#151f47', padding: 24, borderRadius: 12, display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
        {DARK_VARIANTS.map((v) => (
          <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Logotipo variant={v} width={160} />
            <span style={{ fontSize: 11, color: '#aab' }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ── Individual named stories ─────────────────────────────────────────────────

export const Color: Story = { args: { variant: 'Color', width: 160 } };

export const Negativo: Story = {
  args: { variant: 'Negativo', width: 160 },
  decorators: [(Story) => <div style={{ background: '#151f47', padding: 24, borderRadius: 12 }}><Story /></div>],
};

export const Black: Story = { args: { variant: 'Black', width: 160 } };

export const ColorAlt: Story = { args: { variant: 'ColorAlt', width: 160 } };

export const ActuariaPlus: Story = { args: { variant: 'ActuariaPlus', width: 160 } };

export const ActuariaPlusNegativo: Story = {
  args: { variant: 'ActuariaPlusNegativo', width: 160 },
  decorators: [(Story) => <div style={{ background: '#151f47', padding: 24, borderRadius: 12 }}><Story /></div>],
};

export const IsoActuariaPlusColor: Story = { args: { variant: 'IsoActuariaPlusColor', width: 48 } };

export const IsoActuariaPlusNegativo: Story = {
  args: { variant: 'IsoActuariaPlusNegativo', width: 48 },
  decorators: [(Story) => <div style={{ background: '#151f47', padding: 24, borderRadius: 12 }}><Story /></div>],
};
