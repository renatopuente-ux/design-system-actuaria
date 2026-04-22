import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { IconContainer } from './IconContainer';

const meta: Meta<typeof IconContainer> = {
  title: 'Components/IconContainer',
  component: IconContainer,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'brand', 'success', 'warning', 'error'] },
    shape: { control: 'select', options: ['circle', 'square'] },
  },
};
export default meta;
type Story = StoryObj<typeof IconContainer>;

/* Simple SVG star used as a placeholder icon in stories */
const StarIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const Default: Story = {
  args: { size: 'md', variant: 'default', shape: 'square' },
  render: (args) => <IconContainer {...args}><StarIcon /></IconContainer>,
};

export const Brand: Story = {
  args: { size: 'md', variant: 'brand', shape: 'square' },
  render: (args) => <IconContainer {...args}><StarIcon /></IconContainer>,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['default', 'brand', 'success', 'warning', 'error'] as const).map((v) => (
        <IconContainer key={v} variant={v} size="md" shape="square">
          <StarIcon />
        </IconContainer>
      ))}
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <IconContainer variant="brand" size="md" shape="square"><StarIcon /></IconContainer>
      <IconContainer variant="brand" size="md" shape="circle"><StarIcon /></IconContainer>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <IconContainer key={s} variant="brand" size={s} shape="square">
          <StarIcon />
        </IconContainer>
      ))}
    </div>
  ),
};
