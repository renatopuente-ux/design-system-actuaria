import React from 'react';
import { PageSingle } from '../PageSingle/PageSingle';
import styles from './Pagination.module.css';

export type PaginationDevice = 'Desktop' | 'Mobile';

export interface PaginationProps {
  page: number;
  totalPages: number;
  /** Used to compute count label: "Mostrando X - Y de totalItems" */
  pageSize?: number;
  totalItems?: number;
  device?: PaginationDevice;
  onPageChange: (page: number) => void;
  /** @deprecated use onPageChange */
  onChange?: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

function buildRange(page: number, total: number, siblings: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const left = Math.max(2, page - siblings);
  const right = Math.min(total - 1, page + siblings);
  const pages: (number | '...')[] = [1];
  if (left > 2) pages.push('...');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('...');
  pages.push(total);
  return pages;
}

const ChevronLeft20 = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M12.5 15l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronRight20 = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronLeft16 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 13L5 8l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronRight16 = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  pageSize,
  totalItems,
  device = 'Desktop',
  onPageChange,
  onChange,
  siblingCount = 1,
  className,
}) => {
  const handleChange = onPageChange ?? onChange ?? (() => {});
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  if (device === 'Mobile') {
    return (
      <nav
        className={[styles['pg-root'], styles['pg-root--mobile'], className].filter(Boolean).join(' ')}
        aria-label="Paginación"
      >
        <button
          type="button"
          className={styles['pg-arrow']}
          onClick={() => hasPrev && handleChange(page - 1)}
          disabled={!hasPrev}
          aria-label="Página anterior"
        >
          <ChevronLeft16 />
        </button>
        <span className={styles['pg-mobile-label']}>{page} de {totalPages}</span>
        <button
          type="button"
          className={styles['pg-arrow']}
          onClick={() => hasNext && handleChange(page + 1)}
          disabled={!hasNext}
          aria-label="Página siguiente"
        >
          <ChevronRight16 />
        </button>
      </nav>
    );
  }

  const range = buildRange(page, totalPages, siblingCount);
  const start = pageSize ? (page - 1) * pageSize + 1 : undefined;
  const end = pageSize ? Math.min(page * pageSize, totalItems ?? page * pageSize) : undefined;

  return (
    <nav
      className={[styles['pg-root'], styles['pg-root--desktop'], className].filter(Boolean).join(' ')}
      aria-label="Paginación"
    >
      <div className={styles['pg-controls']}>
        <button
          type="button"
          className={[styles['pg-prev-next'], !hasPrev ? styles['pg-prev-next--disabled'] : ''].filter(Boolean).join(' ')}
          onClick={() => hasPrev && handleChange(page - 1)}
          disabled={!hasPrev}
          aria-label="Página anterior"
        >
          <ChevronLeft20 />
          <span>Anterior</span>
        </button>

        <div className={styles['pg-pages']}>
          {range.map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className={styles['pg-ellipsis']}>…</span>
            ) : (
              <PageSingle
                key={p}
                page={p}
                selected={p === page}
                onClick={() => handleChange(p as number)}
              />
            )
          )}
        </div>

        <button
          type="button"
          className={[styles['pg-prev-next'], !hasNext ? styles['pg-prev-next--disabled'] : ''].filter(Boolean).join(' ')}
          onClick={() => hasNext && handleChange(page + 1)}
          disabled={!hasNext}
          aria-label="Página siguiente"
        >
          <span>Siguiente</span>
          <ChevronRight20 />
        </button>
      </div>

      {start !== undefined && totalItems !== undefined && (
        <span className={styles['pg-count']}>
          Mostrando {start} – {end} de {totalItems}
        </span>
      )}
    </nav>
  );
};

export default Pagination;
