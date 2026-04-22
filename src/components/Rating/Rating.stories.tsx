import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Rating>;

const InteractiveRating = (args: React.ComponentProps<typeof Rating>) => {
  const [value, setValue] = useState(args.value);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
      <Rating {...args} value={value} onChange={setValue} />
      <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 14, color: 'var(--text-weak)' }}>
        {value === 0 ? 'Sin valorar' : `Valoración: ${value} / ${args.max ?? 5} estrellas`}
      </p>
    </div>
  );
};

export const Interactivo: Story = {
  render: (args) => <InteractiveRating {...args} />,
  args: { value: 3, max: 5, size: 'md' },
};

export const SoloLectura: Story = {
  args: {
    value: 4,
    max: 5,
    readonly: true,
    size: 'md',
  },
};

export const Pequeno: Story = {
  args: { value: 4, max: 5, readonly: true, size: 'sm' },
};

export const Grande: Story = {
  args: { value: 5, max: 5, readonly: true, size: 'lg' },
};

export const SatisfaccionCliente: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'var(--font-family-body)' }}>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>
        Satisfacción con la plataforma de cálculo
      </p>
      {[
        { label: 'Facilidad de uso', value: 4 },
        { label: 'Precisión de resultados', value: 5 },
        { label: 'Velocidad de cálculo', value: 3 },
        { label: 'Visualización de datos', value: 4 },
      ].map(({ label, value }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <span style={{ fontSize: 14, color: 'var(--text-weak)', minWidth: 180 }}>{label}</span>
          <Rating value={value} max={5} readonly size="sm" />
        </div>
      ))}
    </div>
  ),
};
