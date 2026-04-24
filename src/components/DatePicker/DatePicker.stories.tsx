import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import type { DatePickerProps } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minWidth: 320, padding: 40 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

// ─── Default — no value, no label ────────────────────────────────────────────
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return <DatePicker value={date} onChange={setDate} />;
  },
};

// ─── WithLabel — label + hint + required ─────────────────────────────────────
export const WithLabel: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        label="Fecha de nacimiento"
        hint
        required
      />
    );
  },
};

// ─── Filled — preselected today ───────────────────────────────────────────────
export const Filled: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date());
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        label="Fecha seleccionada"
      />
    );
  },
};

// ─── Optional ─────────────────────────────────────────────────────────────────
export const Optional: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        label="Fecha de vencimiento"
        optional
      />
    );
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <DatePicker
      value={new Date(2026, 3, 24)}
      onChange={() => {}}
      label="Fecha bloqueada"
      disabled
    />
  ),
};

// ─── Invalid ──────────────────────────────────────────────────────────────────
export const Invalid: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        label="Fecha de inicio"
        valid={false}
        errorMessage="Selecciona una fecha válida"
      />
    );
  },
};

// ─── WithMinMax — today to today+30 ──────────────────────────────────────────
export const WithMinMax: Story = {
  render: () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);
    const [date, setDate] = useState<Date | undefined>();
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        label="Fecha disponible"
        hint
        minDate={today}
        maxDate={maxDate}
      />
    );
  },
};

// ─── Playground — all props as controls ──────────────────────────────────────
export const Playground: Story = {
  args: {
    label: 'Fecha de nacimiento',
    hint: true,
    optional: false,
    required: false,
    disabled: false,
    valid: true,
    errorMessage: '',
  } satisfies Partial<DatePickerProps>,
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>();
    return <DatePicker {...args} value={date} onChange={setDate} />;
  },
};
