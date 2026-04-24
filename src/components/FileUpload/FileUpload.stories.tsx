import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FileUpload, FileUploadFile } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

// ─── Static stories ───────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Documentos',
    hint: true,
    accept: '.pdf,.docx',
    required: true,
    onFilesAdded: (files) => console.log('Added:', files.map((f) => f.name)),
  },
};

export const Invalid: Story = {
  args: {
    label: 'Documentos',
    valid: false,
    errorMessage: 'Solo se permiten archivos PDF',
    onFilesAdded: (files) => console.log('Added:', files.map((f) => f.name)),
  },
};

export const WithFilesUploaded: Story = {
  args: {
    label: 'Documentos',
    files: [
      { id: '1', name: 'reservas-q1-2025.pdf', size: 2_340_000 },
      { id: '2', name: 'capital-actuarial.docx', size: 870_500 },
      { id: '3', name: 'primas-netas.xlsx', size: 1_120_000 },
    ],
    onFilesAdded: (files) => console.log('Added:', files.map((f) => f.name)),
    onRemove: (id) => console.log('Remove:', id),
  },
};

export const Optional: Story = {
  args: {
    label: 'Documentos adicionales',
    optional: true,
    accept: '.pdf',
    onFilesAdded: (files) => console.log('Added:', files.map((f) => f.name)),
  },
};

// ─── Interactive stories (useState required) ──────────────────────────────────

export const WithFilesUploading: Story = {
  render: () => {
    const [files] = useState<FileUploadFile[]>([
      { id: '1', name: 'reservas-q1-2025.pdf', size: 2_340_000, progress: 25 },
      { id: '2', name: 'capital-actuarial.docx', size: 870_500, progress: 75 },
      { id: '3', name: 'primas-netas.xlsx', size: 1_120_000, progress: 75 },
    ]);
    return (
      <FileUpload
        label="Documentos"
        files={files}
        onFilesAdded={(f) => console.log('Added:', f.map((x) => x.name))}
        onRemove={(id) => console.log('Remove:', id)}
      />
    );
  },
};

export const Mixed: Story = {
  render: () => {
    const [files, setFiles] = useState<FileUploadFile[]>([
      { id: '1', name: 'reservas-q1-2025.pdf', size: 2_340_000, progress: 40 },
      { id: '2', name: 'capital-actuarial.docx', size: 870_500, progress: 80 },
      { id: '3', name: 'primas-netas.xlsx', size: 1_120_000 },
      { id: '4', name: 'datos-mortalidad.csv', size: 430_000 },
    ]);
    return (
      <FileUpload
        label="Documentos"
        hint
        accept=".pdf,.xlsx,.csv,.docx"
        files={files}
        onFilesAdded={(f) => console.log('Added:', f.map((x) => x.name))}
        onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
      />
    );
  },
};

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Documentos',
    accept: '.pdf,.docx',
    multiple: true,
    hint: true,
    optional: false,
    required: false,
    valid: true,
    errorMessage: 'Error al cargar el archivo',
    maxSize: 5 * 1024 * 1024,
    onFilesAdded: (files) => console.log('Added:', files.map((f) => f.name)),
  },
  argTypes: {
    valid: { control: 'boolean' },
    hint: { control: 'boolean' },
    optional: { control: 'boolean' },
    required: { control: 'boolean' },
    multiple: { control: 'boolean' },
    label: { control: 'text' },
    accept: { control: 'text' },
    errorMessage: { control: 'text' },
    maxSize: { control: 'number' },
  },
};
