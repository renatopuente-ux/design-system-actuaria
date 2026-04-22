import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';
import { Button } from '../Button/Button';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const items = [
  { label: 'Ver perfil', value: 'profile' },
  { label: 'Configuración', value: 'settings' },
  { label: 'Cerrar sesión', value: 'signout', danger: true },
];

export const Default: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button variant="secondary">Opciones ▾</Button>}
      items={items}
      onSelect={(v) => console.log(v)}
    />
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button variant="primary">Acciones ▾</Button>}
      items={[
        { label: 'Editar', value: 'edit' },
        { label: 'Exportar PDF', value: 'export', disabled: true },
        { label: 'Eliminar', value: 'delete', danger: true },
      ]}
      onSelect={(v) => console.log(v)}
    />
  ),
};
