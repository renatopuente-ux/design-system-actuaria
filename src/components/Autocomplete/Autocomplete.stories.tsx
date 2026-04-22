import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Autocomplete } from './Autocomplete';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Autocomplete>;

const tablasOptions = [
  'CNSF 2000-I (Vida individual)',
  'CNSF 2000-G (Grupo)',
  'CNSF 2000-R (Rentas)',
  'CNSF 2015 (Actualizada)',
  'SOA RP-2014 (Internacional)',
  'SOA RP-2000 (Pensiones)',
  'Makeham-Gompertz ajustada',
  'Weibull (ramos técnicos)',
];

const claveOptions = [
  'ACTUARIA-001 · Grupo Bimbo',
  'ACTUARIA-002 · BBVA México',
  'ACTUARIA-003 · Pemex',
  'ACTUARIA-004 · CFE',
  'ACTUARIA-005 · Telcel',
  'ACTUARIA-006 · Walmart México',
  'ACTUARIA-007 · IMSS',
  'ACTUARIA-008 · ISSSTE',
];

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 360 }}>
        <Autocomplete
          label="Tabla de mortalidad"
          value={val}
          onChange={setVal}
          options={tablasOptions}
          placeholder="Buscar tabla…"
        />
      </div>
    );
  },
};

export const ClientSearch: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 360 }}>
        <Autocomplete
          label="Cliente"
          value={val}
          onChange={setVal}
          options={claveOptions}
          placeholder="Buscar cliente por nombre o clave…"
        />
      </div>
    );
  },
};

export const WithPrefilledValue: Story = {
  render: () => {
    const [val, setVal] = useState('CNSF 2000');
    return (
      <div style={{ width: 360 }}>
        <Autocomplete
          label="Tabla de mortalidad"
          value={val}
          onChange={setVal}
          options={tablasOptions}
          placeholder="Buscar tabla…"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Tabla de mortalidad',
    value: 'CNSF 2000-I (Vida individual)',
    onChange: () => {},
    options: tablasOptions,
    disabled: true,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
