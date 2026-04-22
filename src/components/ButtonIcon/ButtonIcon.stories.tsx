import type { Meta, StoryObj } from '@storybook/react';
import { ButtonIcon } from './ButtonIcon';

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const meta: Meta<typeof ButtonIcon> = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const Primary: Story = { args: { variant: 'primary', icon: <PlusIcon />, ariaLabel: 'Agregar' } };
export const Secondary: Story = { args: { variant: 'secondary', icon: <PlusIcon />, ariaLabel: 'Agregar' } };
export const Ghost: Story = { args: { variant: 'ghost', icon: <PlusIcon />, ariaLabel: 'Agregar' } };
export const Danger: Story = { args: { variant: 'danger', icon: <PlusIcon />, ariaLabel: 'Eliminar' } };
export const Disabled: Story = { args: { variant: 'primary', icon: <PlusIcon />, ariaLabel: 'Agregar', disabled: true } };
