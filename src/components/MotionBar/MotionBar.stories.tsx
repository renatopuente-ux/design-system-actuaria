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

export const Colaboradores: Story = {
  args: {
    title: 'Distribución colaboradores por tiempo de servicio',
    bars: [
      { label: 'Jubilados',                value: 22,  color: '#e07c6e' },
      { label: '≥ 25 años',               value: 25,  color: '#151f47' },
      { label: '≥ 20 años\n< 25 años',    value: 32,  color: '#2d4f8c' },
      { label: '≥ 15 años\n< 20 años',    value: 96,  color: '#e05a28' },
      { label: '≥ 10 años\n< 15 años',    value: 182, color: '#5b8ecf' },
      { label: '< 10 años',               value: 279, color: '#8ab4e8' },
    ],
    maxValue: 300,
  },
};

export const Playground: Story = {
  args: {
    title: 'Distribución colaboradores por tiempo de servicio',
    bars: [
      { label: 'Jubilados',                value: 22,  color: '#e07c6e' },
      { label: '≥ 25 años',               value: 25,  color: '#151f47' },
      { label: '≥ 20 años\n< 25 años',    value: 32,  color: '#2d4f8c' },
      { label: '≥ 15 años\n< 20 años',    value: 96,  color: '#e05a28' },
      { label: '≥ 10 años\n< 15 años',    value: 182, color: '#5b8ecf' },
      { label: '< 10 años',               value: 279, color: '#8ab4e8' },
    ],
    maxValue: 300,
  },
  argTypes: {
    title: { control: 'text' },
  },
};
