import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: 'Observaciones de la póliza',
    placeholder: 'Describe condiciones especiales, exclusiones o notas relevantes…',
    hint: 'Esta información aparecerá en el dictamen actuarial.',
    value: '',
    onChange: () => {},
  },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const WithCharacterCounter: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 400 }}>
        <TextArea
          label="Justificación técnica"
          value={val}
          onChange={setVal}
          placeholder="Describe el método actuarial aplicado…"
          maxLength={300}
          hint="Máximo 300 caracteres."
        />
      </div>
    );
  },
};

export const NearLimit: Story = {
  render: () => {
    const text = 'La reserva técnica se calculó aplicando el método prospectivo con tablas CNSF 2000-I, tasa de descuento del 4.5% anual y proyección a 20 años con mortalidad ajustada por experiencia propia. Se validaron los supuestos contra la cartera vigente al cierre del ejercicio fiscal anterior, confirmando consistencia actuarial.';
    const [val, setVal] = useState(text);
    return (
      <div style={{ width: 400 }}>
        <TextArea
          label="Justificación técnica"
          value={val}
          onChange={setVal}
          maxLength={300}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  args: {
    label: 'Descripción del siniestro',
    value: '',
    onChange: () => {},
    error: 'Este campo es obligatorio para procesar la reclamación.',
  },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const Disabled: Story = {
  args: {
    label: 'Dictamen previo',
    value: 'Reserva técnica aprobada conforme al artículo 218 LISF.',
    onChange: () => {},
    disabled: true,
    rows: 3,
  },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};
