import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return <DatePicker value={date} onChange={setDate} label="Fecha de inicio" />;
  },
};
export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date(2026, 3, 22));
    return <DatePicker value={date} onChange={setDate} label="Fecha de cálculo" />;
  },
};
export const Disabled: Story = {
  render: () => <DatePicker value={new Date()} onChange={() => {}} disabled label="Fecha bloqueada" />,
};
