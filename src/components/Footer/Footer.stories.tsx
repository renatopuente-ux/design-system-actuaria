import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Footer>;

const LogoPlaceholder = () => (
  <svg width="120" height="32" viewBox="0 0 120 32" fill="none" aria-label="Actuaria">
    <rect width="32" height="32" rx="6" fill="#4c64d9" />
    <text x="40" y="22" fill="white" fontFamily="Nunito, sans-serif" fontSize="16" fontWeight="600">
      Actuaria
    </text>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const defaultColumns = [
  {
    title: 'Productos',
    links: [
      { label: 'Actuaria Plus', href: '#' },
      { label: 'Calculadoras actuariales', href: '#' },
      { label: 'Dashboards de riesgo', href: '#' },
      { label: 'Modelos predictivos', href: '#' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Actuaria', href: '#' },
      { label: 'Equipo directivo', href: '#' },
      { label: 'Casos de éxito', href: '#' },
      { label: 'Contacto', href: '#' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Documentación técnica', href: '#' },
      { label: 'Guías actuariales', href: '#' },
      { label: 'Blog de riesgos', href: '#' },
      { label: 'Soporte', href: '#' },
    ],
  },
];

export const Default: Story = {
  args: {
    logo: <LogoPlaceholder />,
    columns: defaultColumns,
    legal: '© 2026 Actuaria Consultores. Más de 35 años mitigando riesgos financieros.',
    socialLinks: [
      { icon: <LinkedInIcon />, href: 'https://linkedin.com', label: 'LinkedIn de Actuaria' },
      { icon: <TwitterIcon />, href: 'https://twitter.com', label: 'Twitter de Actuaria' },
    ],
  },
};

export const NoLogo: Story = {
  args: {
    columns: defaultColumns,
    legal: '© 2026 Actuaria Consultores. Todos los derechos reservados.',
  },
};

export const MinimalFooter: Story = {
  args: {
    legal: '© 2026 Actuaria Consultores · actuaria.com',
  },
};
