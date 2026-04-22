import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Modal>;

const ModalDemo = (args: React.ComponentProps<typeof Modal>) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '8px 16px',
          borderRadius: 8,
          background: 'var(--interactive-action)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-family-body)',
          fontWeight: 600,
        }}
      >
        Abrir modal
      </button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const Confirmar: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Confirmar recálculo de reservas',
    size: 'sm',
    children: (
      <p>
        Este proceso recalculará todas las reservas técnicas para el período 2026-Q1.
        El tiempo estimado es de 3 minutos. ¿Deseas continuar?
      </p>
    ),
    footer: (
      <>
        <button style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid var(--stroke-weak)', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-family-body)', fontWeight: 600, color: 'var(--text-weak)' }}>
          Cancelar
        </button>
        <button style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: 'var(--interactive-action)', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-family-body)', fontWeight: 600 }}>
          Confirmar
        </button>
      </>
    ),
  },
};

export const DetallePoliza: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Detalle de póliza #POL-2026-00847',
    size: 'md',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p><strong>Tipo:</strong> Vida grupo con beneficio adicional por invalidez</p>
        <p><strong>Suma asegurada:</strong> $5,000,000.00 MXN</p>
        <p><strong>Tasa de prima:</strong> 2.35% anual sobre capital</p>
        <p><strong>Tabla de mortalidad:</strong> CNSF 2000-I (Hombres)</p>
        <p><strong>Tasa de descuento:</strong> 6.50% anual</p>
        <p><strong>Reserva técnica calculada:</strong> $1,287,430.22 MXN</p>
      </div>
    ),
  },
};

export const Reporte: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Reporte de siniestralidad 2025',
    size: 'lg',
    children: (
      <p style={{ lineHeight: 1.7 }}>
        Durante el ejercicio 2025, la siniestralidad total del portafolio de vida individual fue de
        $48.7 millones de pesos, representando un índice de siniestralidad del 67.3% sobre la prima
        devengada. La frecuencia de siniestros se mantuvo dentro del rango actuarial proyectado,
        con una varianza del 2.1% respecto al modelo estocástico aplicado. Las edades promedio de
        siniestro fueron consistentes con las tablas de mortalidad vigentes.
      </p>
    ),
  },
};
