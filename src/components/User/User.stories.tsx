import type { Meta, StoryObj } from '@storybook/react';
import { User } from './User';

const meta: Meta<typeof User> = {
  title: 'Components/User',
  component: User,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof User>;

export const Small: Story = { args: { name: 'Renato Puente', role: 'Admin', size: 'sm' } };
export const Medium: Story = { args: { name: 'Jonathan Narváez', role: 'Super Administrador', size: 'md' } };
export const Large: Story = { args: { name: 'Christopher Espinoza', role: 'Super Administrador', size: 'lg' } };
