import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { LoadingBar } from './LoadingBar';

const meta: Meta<typeof LoadingBar> = {
  title: 'Components/LoadingBar',
  component: LoadingBar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof LoadingBar>;

export const Indeterminado: Story = {
  args: {
    indeterminate: true,
    height: 4,
  },
};

export const Determinado50: Story = {
  args: {
    progress: 50,
    height: 4,
  },
};

export const Determinado100: Story = {
  args: {
    progress: 100,
    height: 4,
  },
};

export const Grueso: Story = {
  args: {
    indeterminate: true,
    height: 8,
  },
};

// Simulates a real actuarial calculation progressing in real-time
const AnimatedDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) return;
    const timer = setTimeout(() => setProgress((p) => Math.min(100, p + 5)), 200);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 14, color: 'var(--text-weak)' }}>
        {progress < 100 ? `Calculando reservas técnicas... ${progress}%` : 'Cálculo completado'}
      </p>
      <LoadingBar progress={progress} height={6} />
    </div>
  );
};

export const Animado: Story = {
  render: () => <AnimatedDemo />,
};
