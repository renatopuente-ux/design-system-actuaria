import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Pagination>;

// Interactive wrapper so the story responds to clicks
function PaginationInteractive({
  initialPage,
  totalPages,
  siblingCount,
}: {
  initialPage: number;
  totalPages: number;
  siblingCount?: number;
}) {
  const [page, setPage] = useState(initialPage);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        siblingCount={siblingCount}
      />
      <p style={{ fontSize: 13, color: 'var(--text-weak)' }}>
        Mostrando página <strong>{page}</strong> de <strong>{totalPages}</strong> — Pólizas activas
        de clientes ACTUARIA
      </p>
    </div>
  );
}

export const Default: Story = {
  render: () => <PaginationInteractive initialPage={1} totalPages={10} />,
};

export const MidRange: Story = {
  render: () => <PaginationInteractive initialPage={5} totalPages={10} />,
};

export const LastPage: Story = {
  render: () => <PaginationInteractive initialPage={10} totalPages={10} />,
};

export const LargeRange: Story = {
  render: () => <PaginationInteractive initialPage={15} totalPages={50} siblingCount={2} />,
};

export const SmallRange: Story = {
  render: () => <PaginationInteractive initialPage={2} totalPages={4} />,
};

export const SinglePage: Story = {
  args: {
    page: 1,
    totalPages: 1,
    onChange: () => undefined,
  },
};
