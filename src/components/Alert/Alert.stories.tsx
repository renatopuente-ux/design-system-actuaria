import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert } from './Alert';
import type { AlertTone } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['Error', 'Warning', 'Success', 'Information', 'Neutral', 'Brand', 'Inverse neutral', 'Inverse brand'],
    },
    size:   { control: 'radio', options: ['Large', 'Small'] },
    layout: { control: 'radio', options: ['Horizontal', 'Vertical'] },
  },
};
export default meta;

type Story = StoryObj<typeof Alert>;

// ── Default / playground ───────────────────────────────────
export const Default: Story = {
  args: {
    tone:       'Error',
    size:       'Large',
    layout:     'Horizontal',
    heading:    'Error en el cálculo de reservas',
    children:   'No se pudieron calcular las reservas matemáticas para el período seleccionado. Verifica los parámetros actuariales y vuelve a intentarlo.',
    borderLeft: true,
    dismissible: true,
    icon:       true,
  },
};

// ── All tones ──────────────────────────────────────────────
const TONES: AlertTone[] = [
  'Error', 'Warning', 'Success', 'Information',
  'Neutral', 'Brand', 'Inverse neutral', 'Inverse brand',
];

const TONE_COPY: Record<AlertTone, { heading: string; body: string }> = {
  'Error':           { heading: 'Error en el cálculo', body: 'No se pudo procesar la solicitud. Revisa los parámetros e intenta de nuevo.' },
  'Warning':         { heading: 'Advertencia de solvencia', body: 'El índice de solvencia se acerca al umbral mínimo regulatorio del 100%.' },
  'Success':         { heading: 'Valuación completada', body: 'Las reservas matemáticas se calcularon correctamente para el período Q1 2024.' },
  'Information':     { heading: 'Actualización disponible', body: 'Las tablas de mortalidad EMSSA 2009 han sido actualizadas en el sistema.' },
  'Neutral':         { heading: 'Proceso en cola', body: 'El modelo de deserción se procesará en los próximos 5 minutos.' },
  'Brand':           { heading: 'Nueva función disponible', body: 'Ahora puedes exportar tus reservas en formato XBRL para reportes regulatorios.' },
  'Inverse neutral': { heading: 'Modo mantenimiento', body: 'El sistema estará en mantenimiento el sábado de 02:00 a 06:00 hrs.' },
  'Inverse brand':   { heading: 'Actuaria Plus Pro', body: 'Desbloquea modelos de capital económico avanzados con tu plan Empresarial.' },
};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 640 }}>
      {TONES.map((tone) => (
        <Alert
          key={tone}
          tone={tone}
          heading={TONE_COPY[tone].heading}
          dismissible={false}
        >
          {TONE_COPY[tone].body}
        </Alert>
      ))}
    </div>
  ),
};

// ── Small size ─────────────────────────────────────────────
export const SmallHorizontal: Story = {
  args: {
    tone:       'Warning',
    size:       'Small',
    layout:     'Horizontal',
    heading:    'Advertencia de solvencia',
    children:   'El índice de solvencia se acerca al umbral mínimo del 100%.',
    borderLeft: true,
    dismissible: true,
  },
};

export const SmallVertical: Story = {
  args: {
    tone:       'Success',
    size:       'Small',
    layout:     'Vertical',
    heading:    'Valuación completada',
    children:   'Las reservas matemáticas se calcularon correctamente.',
    borderLeft: true,
    dismissible: true,
  },
};

// ── Vertical layout ────────────────────────────────────────
export const LargeVertical: Story = {
  args: {
    tone:       'Information',
    size:       'Large',
    layout:     'Vertical',
    heading:    'Tablas actualizadas',
    children:   'Las tablas de mortalidad EMSSA 2009 se han actualizado. Recalcula las reservas para reflejar los nuevos valores.',
    borderLeft: true,
    dismissible: true,
  },
};

// ── No heading (body only) ─────────────────────────────────
export const BodyOnly: Story = {
  args: {
    tone:       'Neutral',
    size:       'Large',
    layout:     'Horizontal',
    children:   'El modelo de deserción se procesará en los próximos 5 minutos.',
    dismissible: false,
    borderLeft:  false,
  },
};

// ── Icon container (pill) variant ─────────────────────────
export const WithIconContainer: Story = {
  args: {
    tone:          'Brand',
    size:          'Large',
    layout:        'Horizontal',
    heading:       'Nueva función disponible',
    children:      'Exporta reservas en formato XBRL para reportes regulatorios.',
    iconContainer: true,
    borderLeft:    true,
    dismissible:   true,
  },
};

// ── No icon ────────────────────────────────────────────────
export const NoIcon: Story = {
  args: {
    tone:       'Error',
    size:       'Large',
    layout:     'Horizontal',
    heading:    'Error en el cálculo',
    children:   'No se pudo procesar la solicitud.',
    icon:       false,
    borderLeft: true,
    dismissible: true,
  },
};

// ── No border bar ──────────────────────────────────────────
export const NoBorderBar: Story = {
  args: {
    tone:        'Success',
    size:        'Large',
    layout:      'Horizontal',
    heading:     'Valuación completada',
    children:    'Las reservas matemáticas se calcularon correctamente.',
    borderLeft:  false,
    dismissible: true,
  },
};

// ── With link ──────────────────────────────────────────────
export const WithLink: Story = {
  args: {
    tone:       'Information',
    size:       'Large',
    layout:     'Horizontal',
    heading:    'Documentación actualizada',
    children:   'Revisa los cambios en la metodología de cálculo.',
    link:       <a href="#" style={{ fontSize: 14, color: '#4c64d9', textDecoration: 'underline' }}>Ver cambios</a>,
    borderLeft: true,
    dismissible: false,
  },
};

// ── Inverse tones ──────────────────────────────────────────
export const InverseNeutral: Story = {
  args: {
    tone:       'Inverse neutral',
    size:       'Large',
    layout:     'Horizontal',
    heading:    'Modo mantenimiento',
    children:   'El sistema estará en mantenimiento el sábado de 02:00 a 06:00 hrs.',
    borderLeft: true,
    dismissible: true,
  },
};

export const InverseBrand: Story = {
  args: {
    tone:       'Inverse brand',
    size:       'Large',
    layout:     'Horizontal',
    heading:    'Actuaria Plus Pro',
    children:   'Desbloquea modelos de capital económico avanzados con tu plan Empresarial.',
    borderLeft: true,
    dismissible: true,
  },
};
