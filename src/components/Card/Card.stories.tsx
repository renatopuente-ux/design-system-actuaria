import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Card>;

const content = <p style={{ margin: 0, fontFamily: 'Nunito, sans-serif', color: 'rgba(0,9,51,0.65)' }}>Contenido de ejemplo para la tarjeta del design system de Actuaria.</p>;

export const Default: Story = { args: { children: content } };
export const NoShadow: Story = { args: { children: content, shadow: false } };
export const Clickable: Story = { args: { children: content, onClick: () => alert('Click!'), 'aria-label': 'Ver detalle' } };
export const LargePadding: Story = { args: { children: content, padding: 'lg' } };
