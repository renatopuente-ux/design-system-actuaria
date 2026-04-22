import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Components/BarChart',
  component: BarChart,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof BarChart>;

const reservasData = [
  { label: 'Ene', value: 42500 },
  { label: 'Feb', value: 38200 },
  { label: 'Mar', value: 51000 },
  { label: 'Abr', value: 47800 },
  { label: 'May', value: 55300 },
  { label: 'Jun', value: 49100 },
];

export const Default: Story = {
  args: { data: reservasData, title: 'RESERVAS POR MES (USD)', height: 240 },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};
export const NoValues: Story = {
  args: { data: reservasData, showValues: false },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};
