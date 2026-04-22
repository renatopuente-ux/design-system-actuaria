import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NavigationSide } from './NavigationSide';

const meta: Meta<typeof NavigationSide> = {
  title: 'Components/NavigationSide',
  component: NavigationSide,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof NavigationSide>;

// Simple icon placeholders — replace with your actual icon library
function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconReservas() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconSolvencia() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconReportes() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="2" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <IconDashboard />, href: '/dashboard' },
  {
    id: 'reservas',
    label: 'Reservas Matemáticas',
    icon: <IconReservas />,
    children: [
      { id: 'reservas-vida', label: 'Vida Individual', href: '/reservas/vida' },
      { id: 'reservas-grupo', label: 'Vida Grupo', href: '/reservas/grupo' },
      { id: 'reservas-pension', label: 'Pensiones', href: '/reservas/pension' },
    ],
  },
  {
    id: 'solvencia',
    label: 'Índice de Solvencia',
    icon: <IconSolvencia />,
    children: [
      { id: 'solvencia-scr', label: 'Capital SCR', href: '/solvencia/scr' },
      { id: 'solvencia-mcr', label: 'Capital MCR', href: '/solvencia/mcr' },
    ],
  },
  { id: 'reportes', label: 'Reportes Regulatorios', icon: <IconReportes />, href: '/reportes' },
];

export const Default: Story = {
  args: {
    items: navigationItems,
    activeId: 'dashboard',
    collapsed: false,
  },
};

export const ActiveSubItem: Story = {
  args: {
    items: navigationItems,
    activeId: 'reservas-pension',
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    items: navigationItems,
    activeId: 'dashboard',
    collapsed: true,
  },
};

export const NoActiveItem: Story = {
  args: {
    items: navigationItems,
    collapsed: false,
  },
};
