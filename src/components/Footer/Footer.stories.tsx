import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Footer } from './Footer';
import type { FooterProps, FooterLink, FooterColumn, SocialLink } from './Footer';

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
    <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M13 21v-8h2.5l.5-3H13V8.5C13 7.67 13.33 7 14.5 7H16V4.5S15 4 13.5 4C11.5 4 10 5.5 10 7.5V10H7.5v3H10v8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
    <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
    <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
    <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9l5 3-5 3V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const logoPlaceholder = (
  <svg width="120" height="32" viewBox="0 0 120 32" fill="none" aria-label="Actuaria">
    <rect width="32" height="32" rx="6" fill="#4c64d9" />
    <text x="40" y="22" fill="#0c0f1e" fontFamily="Nunito, sans-serif" fontSize="16" fontWeight="700">
      Actuaria
    </text>
  </svg>
);

const allSocialLinks: SocialLink[] = [
  { icon: <InstagramIcon />, href: 'https://instagram.com/actuariaec', label: 'Instagram' },
  { icon: <FacebookIcon />, href: 'https://facebook.com/actuariaec', label: 'Facebook' },
  { icon: <LinkedInIcon />, href: 'https://linkedin.com/company/actuaria', label: 'LinkedIn' },
  { icon: <XIcon />, href: 'https://x.com/actuariaec', label: 'X (Twitter)' },
  { icon: <YouTubeIcon />, href: 'https://youtube.com/@actuariaec', label: 'YouTube' },
];

const navLinks: FooterLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
];

const columns: FooterColumn[] = [
  {
    title: 'Productos',
    links: [
      { label: 'Actuaria Plus', href: '/productos/actuaria-plus' },
      { label: 'Data Wave', href: '/productos/data-wave' },
      { label: 'Data Analytics', href: '/productos/data-analytics' },
    ],
  },
  {
    title: 'Servicios',
    links: [
      { label: 'Reservas técnicas', href: '/servicios/reservas' },
      { label: 'Capital regulatorio', href: '/servicios/capital' },
      { label: 'Consultoría actuarial', href: '/servicios/consultoria' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Quiénes somos', href: '/empresa' },
      { label: 'Clientes', href: '/clientes' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
];

const legal = '© 2024 Actuaria Consultores. Todos los derechos reservados.';
const description = 'Actuaria Consultores — 35 años transformando la gestión actuarial en Ecuador.';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['Small', 'Large'],
    },
    legal: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<FooterProps>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const SmallDesktop: Story = {
  name: 'Small — Desktop',
  args: {
    size: 'Small',
    logo: logoPlaceholder,
    navLinks,
    socialLinks: allSocialLinks,
    legal,
  },
};

export const LargeDesktop: Story = {
  name: 'Large — Desktop',
  args: {
    size: 'Large',
    logo: logoPlaceholder,
    description,
    columns,
    socialLinks: allSocialLinks,
    legal,
  },
};

export const LargeNoColumns: Story = {
  name: 'Large — No columns',
  args: {
    size: 'Large',
    logo: logoPlaceholder,
    description,
    legal,
  },
};

export const SmallMinimal: Story = {
  name: 'Small — Minimal (no social)',
  args: {
    size: 'Small',
    logo: logoPlaceholder,
    navLinks,
    legal,
  },
};

export const Playground: Story = {
  name: 'Playground',
  args: {
    size: 'Large',
    logo: logoPlaceholder,
    description,
    navLinks,
    columns,
    socialLinks: allSocialLinks,
    legal,
  },
};
