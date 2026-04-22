import type { Meta, StoryObj } from '@storybook/react';
import { NavigationHeader } from './NavigationHeader';

const meta: Meta<typeof NavigationHeader> = {
  title: 'Components/NavigationHeader',
  component: NavigationHeader,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof NavigationHeader>;

const links = [
  { label: 'Dashboard', href: '/', active: true },
  { label: 'Estudios', href: '/estudios' },
  { label: 'Simulador', href: '/simulador' },
  { label: 'Reportes', href: '/reportes' },
];

export const Default: Story = {
  args: {
    links,
    user: { name: 'Renato Puente', role: 'Administrador' },
    userMenuItems: [{ label: 'Mi perfil', onClick: () => {} }],
    onSignOut: () => alert('Cerrando sesión...'),
  },
};

export const NoUser: Story = {
  args: { links },
};
