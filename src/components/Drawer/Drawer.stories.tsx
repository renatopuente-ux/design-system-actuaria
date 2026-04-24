import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import type { DrawerProps } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Overlays & Feedback/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['Small', 'Large'],
    },
    open: { control: 'boolean' },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

/* ─── Shared trigger button ──────────────────────────────────────────────── */
const TriggerButton = ({ onClick }: { onClick: () => void }) => (
  <div style={{ padding: 32 }}>
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '12px 24px',
        background: '#151f47',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'Nunito, sans-serif',
      }}
    >
      Abrir Drawer
    </button>
  </div>
);

/* ─── Shared body content ────────────────────────────────────────────────── */
const BodyContent = () => (
  <>
    <div>
      <p
        style={{
          margin: '0 0 8px',
          fontWeight: 600,
          fontSize: 14,
          color: 'var(--text-strong, rgba(0,6,38,0.9))',
          fontFamily: 'Nunito, sans-serif',
        }}
      >
        Nombre del módulo
      </p>
      <input
        type="text"
        placeholder="Ej. Reservas técnicas Q1"
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 8,
          border: '1.5px solid rgba(0,17,102,0.2)',
          fontSize: 14,
          boxSizing: 'border-box',
          fontFamily: 'Nunito, sans-serif',
        }}
      />
    </div>
    <div>
      <p
        style={{
          margin: '0 0 8px',
          fontWeight: 600,
          fontSize: 14,
          color: 'var(--text-strong, rgba(0,6,38,0.9))',
          fontFamily: 'Nunito, sans-serif',
        }}
      >
        Descripción
      </p>
      <textarea
        placeholder="Describe el propósito de este módulo…"
        rows={4}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 8,
          border: '1.5px solid rgba(0,17,102,0.2)',
          fontSize: 14,
          resize: 'vertical',
          boxSizing: 'border-box',
          fontFamily: 'Nunito, sans-serif',
        }}
      />
    </div>
    <div>
      <p
        style={{
          margin: '0 0 8px',
          fontWeight: 600,
          fontSize: 14,
          color: 'var(--text-strong, rgba(0,6,38,0.9))',
          fontFamily: 'Nunito, sans-serif',
        }}
      >
        Periodo de referencia
      </p>
      <select
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 8,
          border: '1.5px solid rgba(0,17,102,0.2)',
          fontSize: 14,
          background: 'white',
          boxSizing: 'border-box',
          fontFamily: 'Nunito, sans-serif',
        }}
      >
        <option>2024 — Q1</option>
        <option>2024 — Q2</option>
        <option>2024 — Q3</option>
        <option>2024 — Q4</option>
      </select>
    </div>
  </>
);

/* ─── SmallDefault ───────────────────────────────────────────────────────── */
export const SmallDefault: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Configuración del módulo"
          size="Small"
        >
          <BodyContent />
        </Drawer>
      </>
    );
  },
};

/* ─── LargeDefault ───────────────────────────────────────────────────────── */
export const LargeDefault: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Configuración del módulo"
          size="Large"
        >
          <BodyContent />
        </Drawer>
      </>
    );
  },
};

/* ─── WithFooter ─────────────────────────────────────────────────────────── */
export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const footer = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          type="button"
          style={{
            width: '100%',
            height: 48,
            background: '#151f47',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          Guardar configuración
        </button>
        <button
          type="button"
          style={{
            width: '100%',
            height: 48,
            background: 'transparent',
            color: '#151f47',
            border: '1.5px solid rgba(21,31,71,0.8)',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          Cancelar
        </button>
      </div>
    );
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Configuración del módulo"
          size="Small"
          footer={footer}
        >
          <BodyContent />
        </Drawer>
      </>
    );
  },
};

/* ─── WithDestructiveFooter ──────────────────────────────────────────────── */
export const WithDestructiveFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const footer = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <button
          type="button"
          style={{
            width: '100%',
            height: 48,
            background: '#151f47',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          Guardar configuración
        </button>
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            color: '#db541f',
            fontSize: 16,
            fontWeight: 600,
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: '4px 0',
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          Eliminar módulo
        </button>
      </div>
    );
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Configuración del módulo"
          size="Small"
          footer={footer}
        >
          <BodyContent />
        </Drawer>
      </>
    );
  },
};

/* ─── NoTitle ────────────────────────────────────────────────────────────── */
export const NoTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Drawer open={open} onClose={() => setOpen(false)} size="Small">
          <BodyContent />
        </Drawer>
      </>
    );
  },
};

/* ─── Playground ─────────────────────────────────────────────────────────── */
export const Playground: Story = {
  render: (args: DrawerProps) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TriggerButton onClick={() => setOpen(true)} />
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          <BodyContent />
        </Drawer>
      </>
    );
  },
  args: {
    title: 'Configuración del módulo',
    size: 'Small',
  },
};
