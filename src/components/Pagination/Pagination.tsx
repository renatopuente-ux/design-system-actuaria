import React, { useId } from 'react';
import styles from './Pagination.module.css';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
}

// Returns the page range with ellipsis markers ('...')
function buildRange(page: number, total: number, siblings: number): (number | '...')[] {
  const delta = siblings + 2; // always show edges + siblings around current

  if (total <= 2 * delta + 1) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(2, page - siblings);
  const right = Math.min(total - 1, page + siblings);

  const pages: (number | '...')[] = [1];

  if (left > 2) pages.push('...');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('...');
  pages.push(total);

  return pages;
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pagination({ page, totalPages, onChange, siblingCount = 1 }: PaginationProps) {
  const uid = useId();
  const range = buildRange(page, totalPages, siblingCount);
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  return (
    <nav
      aria-label="Paginación"
      className={styles['pg-root']}
    >
      {/* Previous button */}
      <button
        className={`${styles['pg-btn']} ${styles['pg-btn--nav']}`}
        onClick={() => onChange(page - 1)}
        disabled={isPrevDisabled}
        aria-label="Página anterior"
        type="button"
      >
        <ChevronLeft />
      </button>

      {/* Page numbers */}
      <ol className={styles['pg-list']} role="list">
        {range.map((item, index) => {
          if (item === '...') {
            return (
              <li key={`${uid}-ellipsis-${index}`} className={styles['pg-item']}>
                <span className={styles['pg-ellipsis']} aria-hidden="true">
                  …
                </span>
              </li>
            );
          }

          const isActive = item === page;
          return (
            <li key={`${uid}-page-${item}`} className={styles['pg-item']}>
              <button
                className={`${styles['pg-btn']} ${isActive ? styles['pg-btn--active'] : ''}`}
                onClick={() => !isActive && onChange(item)}
                aria-label={`Página ${item}`}
                aria-current={isActive ? 'page' : undefined}
                type="button"
              >
                {item}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Next button */}
      <button
        className={`${styles['pg-btn']} ${styles['pg-btn--nav']}`}
        onClick={() => onChange(page + 1)}
        disabled={isNextDisabled}
        aria-label="Página siguiente"
        type="button"
      >
        <ChevronRight />
      </button>
    </nav>
  );
}
