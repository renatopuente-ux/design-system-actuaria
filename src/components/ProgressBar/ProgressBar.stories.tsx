import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { value: 72, label: 'Cobertura de reservas', showValue: true },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
export const Success: Story = {
  args: { value: 95, label: 'Solvencia', color: '#10B981' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
export const Warning: Story = {
  args: { value: 38, label: 'Liquidez', color: '#F59E0B' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
export const Small: Story = {
  args: { value: 60, size: 'sm' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
export const Large: Story = {
  args: { value: 85, label: 'Capital adecuado', size: 'lg' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
