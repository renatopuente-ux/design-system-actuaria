import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'Sin datos disponibles',
    description: 'No hay estudios actuariales registrados para esta empresa.',
    action: { label: 'Crear estudio', onClick: () => {} },
  },
};
export const NoAction: Story = {
  args: { title: 'Sin resultados', description: 'Intenta ajustar los filtros de búsqueda.' },
};
export const Small: Story = {
  args: { ...Default.args, size: 'sm' },
};
