import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Combobox } from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Combobox>;

const monedaOptions = [
  { value: 'MXN', label: 'Peso mexicano (MXN)' },
  { value: 'USD', label: 'Dólar estadounidense (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'UDI', label: 'Unidad de Inversión (UDI)' },
  { value: 'UDIS', label: 'UDIS (BANXICO)' },
  { value: 'VSMDF', label: 'Veces Salario Mínimo DF' },
];

const ramosOptions = [
  { value: 'vida', label: 'Vida' },
  { value: 'accidentes', label: 'Accidentes y enfermedades' },
  { value: 'gmm', label: 'Gastos médicos mayores' },
  { value: 'daños', label: 'Daños' },
  { value: 'pension-riesgo', label: 'Pensiones (riesgo de trabajo)' },
  { value: 'pension-invalidez', label: 'Pensiones (invalidez y vida)' },
  { value: 'pension-retiro', label: 'Pensiones (retiro)' },
];

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 360 }}>
        <Combobox
          label="Moneda de la póliza"
          value={val}
          onChange={setVal}
          options={monedaOptions}
          placeholder="Selecciona o escribe una moneda…"
          clearable
        />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [val, setVal] = useState('MXN');
    return (
      <div style={{ width: 360 }}>
        <Combobox
          label="Moneda de la póliza"
          value={val}
          onChange={setVal}
          options={monedaOptions}
          clearable
        />
      </div>
    );
  },
};

export const RamosSeguro: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 360 }}>
        <Combobox
          label="Ramo de seguro"
          value={val}
          onChange={setVal}
          options={ramosOptions}
          placeholder="Busca o selecciona un ramo…"
          clearable
        />
      </div>
    );
  },
};

export const WithoutClear: Story = {
  render: () => {
    const [val, setVal] = useState('vida');
    return (
      <div style={{ width: 360 }}>
        <Combobox
          label="Ramo de seguro"
          value={val}
          onChange={setVal}
          options={ramosOptions}
          clearable={false}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Moneda de la póliza',
    value: 'MXN',
    onChange: () => {},
    options: monedaOptions,
    disabled: true,
    clearable: false,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
