import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CardFlip } from './CardFlip';

const meta: Meta<typeof CardFlip> = {
  title: 'Components/CardFlip',
  component: CardFlip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CardFlip>;

const cardStyle: React.CSSProperties = {
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '320px',
  minHeight: '220px',
  justifyContent: 'center',
};

const FrontContent = () => (
  <div style={cardStyle}>
    <div style={{ fontSize: '32px' }}>📊</div>
    <h3 style={{ margin: 0, fontFamily: 'Nunito, sans-serif', fontSize: '20px', fontWeight: 600, color: 'rgba(0,6,38,0.9)' }}>
      Reservas técnicas
    </h3>
    <p style={{ margin: 0, fontFamily: 'Nunito, sans-serif', fontSize: '16px', fontWeight: 400, color: 'rgba(0,9,51,0.65)' }}>
      Pasa el cursor para conocer la metodología de cálculo.
    </p>
  </div>
);

const BackContent = () => (
  <div style={{ ...cardStyle, background: 'rgba(76,100,217,0.08)' }}>
    <h3 style={{ margin: 0, fontFamily: 'Nunito, sans-serif', fontSize: '16px', fontWeight: 600, color: '#4c64d9' }}>
      Metodología
    </h3>
    <p style={{ margin: 0, fontFamily: 'Nunito, sans-serif', fontSize: '14px', fontWeight: 400, color: 'rgba(0,9,51,0.65)', lineHeight: '20px' }}>
      Calculamos reservas bajo el método prospectivo: VP(prestaciones futuras) − VP(primas futuras), usando tasas técnicas reguladas y tablas de mortalidad CNSF.
    </p>
  </div>
);

const ClickFront = () => (
  <div style={cardStyle}>
    <div style={{ fontSize: '32px' }}>🔒</div>
    <h3 style={{ margin: 0, fontFamily: 'Nunito, sans-serif', fontSize: '20px', fontWeight: 600, color: 'rgba(0,6,38,0.9)' }}>
      Capital adecuado
    </h3>
    <p style={{ margin: 0, fontFamily: 'Nunito, sans-serif', fontSize: '14px', fontWeight: 400, color: 'rgba(0,9,51,0.65)' }}>
      Haz clic para ver los componentes del cálculo.
    </p>
  </div>
);

const ClickBack = () => (
  <div style={{ ...cardStyle, background: 'rgba(21,31,71,0.05)' }}>
    <h3 style={{ margin: 0, fontFamily: 'Nunito, sans-serif', fontSize: '16px', fontWeight: 600, color: 'rgba(0,6,38,0.9)' }}>
      Componentes
    </h3>
    <ul style={{ margin: 0, paddingLeft: '16px', fontFamily: 'Nunito, sans-serif', fontSize: '14px', fontWeight: 400, color: 'rgba(0,9,51,0.65)', lineHeight: '22px' }}>
      <li>Riesgo de suscripción</li>
      <li>Riesgo de mercado</li>
      <li>Riesgo operacional</li>
      <li>Riesgo de contraparte</li>
    </ul>
  </div>
);

export const HoverFlip: Story = {
  args: {
    front: <FrontContent />,
    back: <BackContent />,
    triggerOnHover: true,
  },
};

export const ClickFlip: Story = {
  args: {
    front: <ClickFront />,
    back: <ClickBack />,
    triggerOnHover: false,
  },
};
