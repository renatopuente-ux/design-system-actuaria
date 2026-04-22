import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState('');
    return <SearchInput value={v} onChange={setV} placeholder="Buscar empresa..." style={{ width: 320 } as React.CSSProperties} />;
  },
};
export const WithLabel: Story = {
  render: () => {
    const [v, setV] = useState('ELECTROLEG');
    return <SearchInput value={v} onChange={setV} label="Empresa" style={{ width: 320 } as React.CSSProperties} />;
  },
};
export const Disabled: Story = {
  render: () => <SearchInput value="" onChange={() => {}} placeholder="Sin acceso" disabled style={{ width: 320 } as React.CSSProperties} />,
};
