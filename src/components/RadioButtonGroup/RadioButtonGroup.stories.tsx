import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioButtonGroup } from './RadioButtonGroup';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Components/RadioButtonGroup',
  component: RadioButtonGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

const roleOptions = [
  { label: 'Super Administrador', value: 'superadmin' },
  { label: 'Administrador', value: 'admin' },
  { label: 'Usuario', value: 'user' },
];

export const Vertical: Story = {
  render: () => {
    const [value, setValue] = useState('admin');
    return (
      <RadioButtonGroup
        options={roleOptions}
        value={value}
        onChange={setValue}
        label="Rol de usuario"
      />
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState('admin');
    return (
      <RadioButtonGroup
        options={roleOptions}
        value={value}
        onChange={setValue}
        orientation="horizontal"
      />
    );
  },
};
