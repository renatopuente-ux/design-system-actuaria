import type { Meta, StoryObj } from '@storybook/react';
import { TextBlock } from './TextBlock';

const meta: Meta<typeof TextBlock> = {
  title: 'Components/TextBlock',
  component: TextBlock,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TextBlock>;

export const Full: Story = {
  args: {
    headingText: 'Reservas técnicas en tiempo real',
    bodyText: 'Calcula y monitorea tus reservas matemáticas con precisión actuarial conforme a IFRS 17.',
    linkText: 'Ir al módulo',
    linkHref: '#',
  },
};
export const Centered: Story = {
  args: { ...Full.args, align: 'center' },
};
export const NoIcon: Story = {
  args: { ...Full.args, icon: false },
};
export const NoLink: Story = {
  args: { ...Full.args, textLink: false },
};
export const TextOnly: Story = {
  args: { ...Full.args, icon: false, textLink: false },
};
