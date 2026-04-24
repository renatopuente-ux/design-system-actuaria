import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from './PieChart';

const meta: Meta<typeof PieChart> = {
  title: 'Components/PieChart',
  component: PieChart,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PieChart>;

export const JubilacionPatronal: Story = {
  args: {
    title: 'Distribución provisión jubilación patronal (en USD)',
    segments: [
      { label: 'Jubilados',              percentage: 22, amount: 1156668, color: '#e07c6e' },
      { label: '≥ 25 años',              percentage: 21, amount: 1099936, color: '#f0aa95' },
      { label: '≥ 20 años y < 25 años',  percentage: 23, amount: 1246493, color: '#9b4f8e' },
      { label: '≥ 15 años y < 20 años',  percentage: 15, amount: 815263,  color: '#151f47' },
      { label: '≥ 10 años y < 15 años',  percentage: 11, amount: 602045,  color: '#2d4f8c' },
      { label: '< 10 años',              percentage:  7, amount: 391285,  color: '#a8c4e8' },
    ],
  },
};

export const BonificacionDesahucio: Story = {
  args: {
    title: 'Distribución provisión bonificación por desahucio (en USD)',
    segments: [
      { label: '≥ 25 años',              percentage: 12, amount: 155089,  color: '#a8c4e8' },
      { label: '≥ 20 y < 25 años',       percentage: 27, amount: 348577,  color: '#9b4f8e' },
      { label: '≥ 15 y < 20 años',       percentage: 22, amount: 285286,  color: '#e07c6e' },
      { label: '≥ 10 y < 15 años',       percentage: 11, amount: 146810,  color: '#2d4f8c' },
      { label: '< 10 años',              percentage: 28, amount: 358069,  color: '#151f47' },
    ],
  },
};

export const Playground: Story = {
  args: {
    title: 'Distribución provisión jubilación patronal (en USD)',
    segments: [
      { label: 'Jubilados',              percentage: 22, amount: 1156668, color: '#e07c6e' },
      { label: '≥ 25 años',              percentage: 21, amount: 1099936, color: '#f0aa95' },
      { label: '≥ 20 años y < 25 años',  percentage: 23, amount: 1246493, color: '#9b4f8e' },
      { label: '≥ 15 años y < 20 años',  percentage: 15, amount: 815263,  color: '#151f47' },
      { label: '≥ 10 años y < 15 años',  percentage: 11, amount: 602045,  color: '#2d4f8c' },
      { label: '< 10 años',              percentage:  7, amount: 391285,  color: '#a8c4e8' },
    ],
  },
  argTypes: {
    title: { control: 'text' },
  },
};
