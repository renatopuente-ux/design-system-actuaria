import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    onRemove: { action: 'removed' },
  },
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: 'Vida Individual',
  },
};

export const WithRemove: Story = {
  args: {
    label: 'Riesgo Catastrófico',
    onRemove: () => alert('Tag removed'),
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Pensiones',
    icon: (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2a5 5 0 1 1 0 10A5 5 0 0 1 8 3z" />
      </svg>
    ),
  },
};

/** Filtros de producto actuarial — interactive tag group simulation */
export const FilterGroup: Story = {
  render: () => {
    const [tags, setTags] = React.useState([
      'Vida Individual',
      'Colectivos',
      'Pensiones',
      'Salud',
      'Daños',
    ]);

    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
          />
        ))}
      </div>
    );
  },
};

/** Tags sin acción — etiquetas de clasificación de siniestros */
export const ReadOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag label="Siniestro mayor" />
      <Tag label="Alta frecuencia" />
      <Tag label="Reaseguro proporcional" />
    </div>
  ),
};
