import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Default: Story = { args: { label: 'Administrador', value: 'admin', name: 'role', checked: false } };
export const Checked: Story = { args: { label: 'Super Admin', value: 'superadmin', name: 'role', checked: true } };
export const Disabled: Story = { args: { label: 'Sin acceso', value: 'none', name: 'role', disabled: true } };
export const DisabledChecked: Story = { args: { label: 'Bloqueado', value: 'blocked', name: 'role', checked: true, disabled: true } };
