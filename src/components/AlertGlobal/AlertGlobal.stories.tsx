import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AlertGlobal } from './AlertGlobal';
import type { AlertGlobalTone } from './AlertGlobal';

const meta: Meta<typeof AlertGlobal> = {
  title: 'Components/AlertGlobal',
  component: AlertGlobal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['Error', 'Warning', 'Success', 'Information', 'Neutral', 'Brand', 'Inverse neutral', 'Inverse brand'],
    },
    device: { control: 'radio', options: ['Desktop', 'Mobile'] },
  },
};
export default meta;

type Story = StoryObj<typeof AlertGlobal>;

// Shared action button helper
function ActionBtn({ label, inverse = false }: { label: string; inverse?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => {}}
      style={{
        height: 32,
        padding: '0 12px',
        border: `1px solid ${inverse ? 'rgba(255,255,255,0.6)' : 'rgba(0,13,77,0.45)'}`,
        borderRadius: 8,
        background: 'rgba(255,255,255,0.01)',
        color: inverse ? 'white' : 'rgba(0,9,51,0.65)',
        fontFamily: 'Nunito, sans-serif',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 4px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)',
      }}
    >
      {label}
    </button>
  );
}

// ── Default / playground ───────────────────────────────────
export const Default: Story = {
  args: {
    tone:       'Error',
    device:     'Desktop',
    children:   'Fallo en la sincronización con el servidor de cálculo. Los resultados pueden no estar actualizados.',
    icon:       true,
    dismissible: true,
    buttonGroup: <ActionBtn label="Reintentar" />,
  },
};

// ── All tones — Desktop ────────────────────────────────────
const TONES: AlertGlobalTone[] = [
  'Error', 'Warning', 'Success', 'Information',
  'Neutral', 'Brand', 'Inverse neutral', 'Inverse brand',
];

const TONE_MESSAGES: Record<AlertGlobalTone, string> = {
  'Error':           'Fallo en la sincronización con el servidor de cálculo. Los resultados pueden no estar actualizados.',
  'Warning':         'Tu sesión expirará en 5 minutos. Guarda los cambios para evitar pérdida de datos.',
  'Success':         'Importación masiva completada: 1,240 pólizas procesadas exitosamente.',
  'Information':     'Mantenimiento programado el 25 de abril de 2026 de 02:00 a 04:00 hrs.',
  'Neutral':         'El modelo de deserción está siendo actualizado. Los cálculos continuarán en breve.',
  'Brand':           'Nueva función disponible: exporta reservas en formato XBRL para reportes regulatorios.',
  'Inverse neutral': 'El sistema entrará en modo mantenimiento en 30 minutos.',
  'Inverse brand':   'Actuaria Plus Pro: desbloquea modelos de capital económico avanzados.',
};

export const AllTonesDesktop: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {TONES.map((tone) => {
        const isInverse = tone === 'Inverse neutral' || tone === 'Inverse brand';
        return (
          <AlertGlobal
            key={tone}
            tone={tone}
            device="Desktop"
            icon
            dismissible
            onDismiss={() => {}}
            buttonGroup={<ActionBtn label="Ver detalles" inverse={isInverse} />}
          >
            {TONE_MESSAGES[tone]}
          </AlertGlobal>
        );
      })}
    </div>
  ),
};

// ── All tones — Mobile ─────────────────────────────────────
export const AllTonesMobile: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 390 }}>
      {TONES.map((tone) => {
        const isInverse = tone === 'Inverse neutral' || tone === 'Inverse brand';
        return (
          <AlertGlobal
            key={tone}
            tone={tone}
            device="Mobile"
            icon
            dismissible
            onDismiss={() => {}}
            buttonGroup={<ActionBtn label="Ver detalles" inverse={isInverse} />}
          >
            {TONE_MESSAGES[tone]}
          </AlertGlobal>
        );
      })}
    </div>
  ),
};

// ── Individual stories ─────────────────────────────────────
export const ErrorDesktop: Story = {
  args: {
    tone:        'Error',
    device:      'Desktop',
    children:    TONE_MESSAGES['Error'],
    icon:        true,
    dismissible: true,
    onDismiss:   () => {},
    buttonGroup: <ActionBtn label="Reintentar" />,
  },
};

export const WarningDesktop: Story = {
  args: {
    tone:        'Warning',
    device:      'Desktop',
    children:    TONE_MESSAGES['Warning'],
    icon:        true,
    dismissible: true,
    onDismiss:   () => {},
    buttonGroup: <ActionBtn label="Extender sesión" />,
  },
};

export const SuccessDesktop: Story = {
  args: {
    tone:        'Success',
    device:      'Desktop',
    children:    TONE_MESSAGES['Success'],
    icon:        true,
    dismissible: true,
    onDismiss:   () => {},
  },
};

export const InformationDesktop: Story = {
  args: {
    tone:        'Information',
    device:      'Desktop',
    children:    TONE_MESSAGES['Information'],
    icon:        true,
    dismissible: true,
    onDismiss:   () => {},
    buttonGroup: <ActionBtn label="Ver detalles" />,
  },
};

export const InverseBrandDesktop: Story = {
  args: {
    tone:        'Inverse brand',
    device:      'Desktop',
    children:    TONE_MESSAGES['Inverse brand'],
    icon:        true,
    dismissible: true,
    onDismiss:   () => {},
    buttonGroup: <ActionBtn label="Ver planes" inverse />,
  },
};

export const NoIcon: Story = {
  args: {
    tone:        'Information',
    device:      'Desktop',
    children:    TONE_MESSAGES['Information'],
    icon:        false,
    dismissible: true,
    onDismiss:   () => {},
  },
};

export const NoDismiss: Story = {
  args: {
    tone:        'Brand',
    device:      'Desktop',
    children:    TONE_MESSAGES['Brand'],
    icon:        true,
    dismissible: false,
    buttonGroup: <ActionBtn label="Activar ahora" />,
  },
};
