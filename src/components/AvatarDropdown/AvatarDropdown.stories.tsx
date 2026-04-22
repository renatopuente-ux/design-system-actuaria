import type { Meta, StoryObj } from '@storybook/react';
import { AvatarDropdown } from './AvatarDropdown';

const meta: Meta<typeof AvatarDropdown> = {
  title: 'Components/AvatarDropdown',
  component: AvatarDropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AvatarDropdown>;

export const Default: Story = {
  args: {
    user: { name: 'Renato Puente', role: 'Administrador' },
    menuItems: [
      { label: 'Mi perfil', onClick: () => {} },
      { label: 'Configuración', onClick: () => {} },
    ],
    onSignOut: () => alert('Cerrando sesión...'),
  },
};
