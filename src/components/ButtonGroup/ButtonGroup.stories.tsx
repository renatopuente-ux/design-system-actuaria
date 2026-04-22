import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/Button';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Horizontal: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Día</Button>
      <Button variant="primary">Mes</Button>
      <Button variant="secondary">Año</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="secondary">Reservas técnicas</Button>
      <Button variant="secondary">Estudios actuariales</Button>
      <Button variant="primary">Simulador</Button>
    </ButtonGroup>
  ),
};
