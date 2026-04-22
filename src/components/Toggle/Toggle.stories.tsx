import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <div style={{ width: 360 }}>
        <Toggle
          checked={on}
          onChange={setOn}
          label="Activar proyección de reservas"
        />
      </div>
    );
  },
};

export const On: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: 'Actualización automática de tablas CNSF',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Small: Story = {
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <div style={{ width: 360 }}>
        <Toggle
          checked={on}
          onChange={setOn}
          label="Modo compacto"
          size="sm"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: 'Modo de auditoría (requiere permiso de administrador)',
    disabled: true,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const DisabledOn: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: 'Integración CNSF activa',
    disabled: true,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
