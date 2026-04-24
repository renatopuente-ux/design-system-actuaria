import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size:    { control: 'radio',   options: ['Large', 'Small'] },
    aiBadge: { control: 'boolean' },
    isAI:    { control: 'boolean' },
    badge: {
      control: 'object',
    },
  },
};
export default meta;
type Story = StoryObj<typeof ProductCard>;

// ── Module icons ───────────────────────────────────────────────

const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%" aria-hidden="true">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ActasIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 20c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FileTextIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BarChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%" aria-hidden="true">
    <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MessageCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

// ── Module data ────────────────────────────────────────────────

const MODULES = [
  {
    id: 'estudios',
    icon: <ActivityIcon />,
    heading: 'Estudios Actuariales',
    body: 'Genera tu cálculo actuarial de provisiones de beneficios post-empleo',
    badge: { label: 'Contratado', tone: 'success' as const },
    backContent: 'Cumple con la normativa contable y toma decisiones con respaldo actuarial. Calculamos provisiones por jubilación y desahucio con resultados sólidos, normativos y listos para auditar.',
  },
  {
    id: 'actas',
    icon: <ActasIcon />,
    heading: 'Actas de Finiquito — Jubilación Patronal',
    body: 'Genera actas de finiquito con los cálculos actuariales de jubilación patronal',
    badge: { label: 'Contratado', tone: 'success' as const },
    backContent: 'Automatizamos la generación de actas de finiquito con los valores actuariales de jubilación patronal, garantizando precisión normativa y trazabilidad de cada cálculo.',
  },
  {
    id: 'impuestos',
    icon: <FileTextIcon />,
    heading: 'Informe de Impuestos Diferidos',
    body: 'Calcula el activo por impuesto diferido para obtener beneficios tributarios',
    badge: { label: 'Disponible', tone: 'warning' as const },
    backContent: 'Calculamos el impuesto diferido por provisiones de jubilación y desahucio bajo normativa contable, para reflejar correctamente la situación fiscal de tu empresa y facilitar la obtención de beneficio tributario.',
  },
  {
    id: 'tributario',
    icon: <BarChartIcon />,
    heading: 'Control Tributario de Provisiones',
    body: 'Controla el tratamiento fiscal de tus provisiones laborales con precisión',
    badge: { label: 'Disponible', tone: 'warning' as const },
    backContent: 'Herramienta de control que cruza la información contable con la fiscal para asegurar el correcto tratamiento tributario de las provisiones por beneficios a empleados.',
  },
  {
    id: 'proyecciones',
    icon: <AlertTriangleIcon />,
    heading: 'Panel de Proyecciones',
    body: 'Analiza el pasivo laboral futuro con proyecciones actuariales personalizadas',
    badge: { label: 'Contratado', tone: 'success' as const },
    backContent: 'Visualiza la evolución futura de tus pasivos laborales bajo distintos escenarios. Proyecciones actuariales adaptadas a la realidad de tu empresa para una mejor planificación.',
  },
  {
    id: 'actuaria',
    icon: <MessageCircleIcon />,
    aiBadge: true,
    isAI: true,
    heading: 'Consulta con ActuarIA',
    body: 'Responde todas tus dudas con nuestra inteligencia artificial actuarial.',
    badge: { label: 'Contratado', tone: 'success' as const },
    backContent: 'Agente de inteligencia artificial entrenado con toda la normativa laboral y modelos actuariales para responder cualquier duda sobre tu informe de jubilación patronal.',
  },
] as const;

// ── Large variants (432px) ─────────────────────────────────────

export const EstudiosActuarialesLarge: Story = {
  args: { ...MODULES[0], size: 'Large' },
};

export const ActasDeFiniquitoLarge: Story = {
  args: { ...MODULES[1], size: 'Large' },
};

export const InformeImpuestosLarge: Story = {
  args: { ...MODULES[2], size: 'Large' },
};

export const ControlTributarioLarge: Story = {
  args: { ...MODULES[3], size: 'Large' },
};

export const PanelProyeccionesLarge: Story = {
  args: { ...MODULES[4], size: 'Large' },
};

export const ConsultaActuarIALarge: Story = {
  args: { ...MODULES[5], size: 'Large' },
};

// ── Small variants (364px) ─────────────────────────────────────

export const EstudiosActuarialesSmall: Story = {
  args: { ...MODULES[0], size: 'Small' },
};

export const ActasDeFiniquitoSmall: Story = {
  args: { ...MODULES[1], size: 'Small' },
};

export const InformeImpuestosSmall: Story = {
  args: { ...MODULES[2], size: 'Small' },
};

export const ControlTributarioSmall: Story = {
  args: { ...MODULES[3], size: 'Small' },
};

export const PanelProyeccionesSmall: Story = {
  args: { ...MODULES[4], size: 'Small' },
};

export const ConsultaActuarIASmall: Story = {
  args: { ...MODULES[5], size: 'Small' },
};

// ── Showcase: all large ────────────────────────────────────────
export const AllModulesLarge: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 432px)', gap: 24 }}>
      {MODULES.map((m) => (
        <ProductCard
          key={m.id}
          size="Large"
          icon={m.icon}
          aiBadge={'aiBadge' in m ? m.aiBadge : false}
          isAI={'isAI' in m ? m.isAI : false}
          heading={m.heading}
          body={m.body}
          badge={m.badge}
          backContent={m.backContent}
        />
      ))}
    </div>
  ),
};

// ── Showcase: all small ────────────────────────────────────────
export const AllModulesSmall: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 364px)', gap: 24 }}>
      {MODULES.map((m) => (
        <ProductCard
          key={m.id}
          size="Small"
          icon={m.icon}
          aiBadge={'aiBadge' in m ? m.aiBadge : false}
          isAI={'isAI' in m ? m.isAI : false}
          heading={m.heading}
          body={m.body}
          badge={m.badge}
          backContent={m.backContent}
        />
      ))}
    </div>
  ),
};

// ── Playground (controls) ──────────────────────────────────────
export const Playground: Story = {
  args: {
    size: 'Large',
    icon: <ActivityIcon />,
    heading: 'Estudios Actuariales',
    body: 'Genera tu cálculo actuarial de provisiones de beneficios post-empleo',
    badge: { label: 'Contratado', tone: 'success' },
    backContent: 'Cumple con la normativa contable y toma decisiones con respaldo actuarial.',
  },
};
