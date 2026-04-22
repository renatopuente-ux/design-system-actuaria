import type { Meta, StoryObj } from '@storybook/react';
import { MotionBar } from './MotionBar';

const meta: Meta<typeof MotionBar> = {
  title: 'Components/MotionBar',
  component: MotionBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof MotionBar>;

export const Default: Story = {
  args: { value: 7843200, target: 10000000, label: 'RESERVAS MATEMÁTICAS', unit: ' USD' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
export const Solvencia: Story = {
  args: { value: 142, target: 200, label: 'ÍNDICE DE SOLVENCIA', unit: '%', color: '#10B981' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
export const FastAnimation: Story = {
  args: { value: 85, target: 100, duration: 400, label: 'KPI RÁPIDO', color: '#F59E0B' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
