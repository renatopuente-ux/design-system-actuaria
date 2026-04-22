import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary', children: 'Calcular reservas' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Ver detalle' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Cancelar' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Eliminar registro' } };
export const Loading: Story = { args: { variant: 'primary', children: 'Procesando...', loading: true } };
export const Disabled: Story = { args: { variant: 'primary', children: 'No disponible', disabled: true } };
export const Small: Story = { args: { variant: 'primary', size: 'sm', children: 'Pequeño' } };
export const Large: Story = { args: { variant: 'primary', size: 'lg', children: 'Generar informe' } };
