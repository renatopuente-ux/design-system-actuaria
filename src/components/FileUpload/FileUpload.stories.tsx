import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    onUpload: (files) => console.log('Uploaded:', files.map((f) => f.name)),
    label: 'Arrastra archivos aquí o haz clic para seleccionar',
  },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};

export const PDFOnly: Story = {
  args: {
    onUpload: (files) => console.log('Uploaded:', files),
    accept: '.pdf',
    label: 'Sube tu reporte actuarial en PDF',
  },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};

export const MultipleWithSizeLimit: Story = {
  args: {
    onUpload: (files) => console.log('Uploaded:', files),
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5 MB
    accept: '.xlsx,.csv,.pdf',
    label: 'Sube hasta varios archivos (máx. 5 MB c/u)',
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};
