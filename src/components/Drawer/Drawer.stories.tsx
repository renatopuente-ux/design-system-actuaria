import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const RightDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 32 }}>
        <Button variant="primary" onClick={() => setOpen(true)}>Abrir panel</Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Detalle del estudio">
          <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(0,9,51,0.65)' }}>
            Contenido del panel lateral. Aquí van los detalles del registro seleccionado.
          </p>
        </Drawer>
      </div>
    );
  },
};

export const LeftDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 32 }}>
        <Button variant="secondary" onClick={() => setOpen(true)}>Menú lateral</Button>
        <Drawer open={open} onClose={() => setOpen(false)} position="left" title="Navegación">
          <p style={{ fontFamily: 'Nunito, sans-serif' }}>Menú de navegación lateral.</p>
        </Drawer>
      </div>
    );
  },
};
