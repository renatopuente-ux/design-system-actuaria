import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Text>;

export const Heading1: Story = { args: { variant: 'heading1', children: 'Reservas Técnicas IFRS 17' } };
export const Heading3: Story = { args: { variant: 'heading3', children: 'Análisis de cobertura' } };
export const Heading4: Story = { args: { variant: 'heading4', children: 'Descripción del módulo' } };
export const Body: Story = { args: { variant: 'body', children: 'El sistema calcula automáticamente las reservas matemáticas para toda tu cartera de seguros de vida.' } };
export const BodyBold: Story = { args: { variant: 'bodyBold', children: 'Saldo actualizado al 22 de abril de 2026' } };
export const Tiny: Story = { args: { variant: 'tiny', children: 'Última actualización: hace 3 horas' } };
export const Uppercase: Story = { args: { variant: 'uppercase', children: 'Estudios actuariales' } };
export const TextLink: Story = { args: { variant: 'textLink', children: 'Ver informe completo', href: '#' } };
