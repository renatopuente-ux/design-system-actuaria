import React from 'react';
import styles from './TableHeadingCell.module.css';

const SortDefaultIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M5 6.5l3-3 3 3M5 9.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SortUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M5 10l3-4 3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SortDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M5 6l3 4 3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export type TableHeadingCellType = 'Header left' | 'Header right' | 'Header checkbox';
export type TableSortable = 'No' | 'Yes' | 'Up' | 'Down';

export interface TableHeadingCellProps {
  type?: TableHeadingCellType;
  sortable?: TableSortable;
  state?: 'Default' | 'Hover';
  label?: string;
  onSort?: () => void;
  className?: string;
}

export const TableHeadingCell: React.FC<TableHeadingCellProps> = ({
  type = 'Header left',
  sortable = 'No',
  state = 'Default',
  label = 'Heading',
  onSort,
  className = '',
}) => {
  const isRight = type === 'Header right';
  const isCheckbox = type === 'Header checkbox';
  const isSortable = sortable !== 'No';

  const SortIcon =
    sortable === 'Up' ? SortUpIcon : sortable === 'Down' ? SortDownIcon : SortDefaultIcon;

  const rootClasses = [
    styles['thc-root'],
    isRight ? styles['thc-root--right'] : '',
    isCheckbox ? styles['thc-root--checkbox'] : '',
    state === 'Hover' ? styles['thc-root--hover'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (isCheckbox) {
    return (
      <div className={rootClasses}>
        <input
          type="checkbox"
          className={styles['thc-checkbox']}
          aria-label="Seleccionar todo"
        />
      </div>
    );
  }

  if (isSortable) {
    return (
      <div className={rootClasses}>
        <button
          type="button"
          className={[
            styles['thc-sort-btn'],
            isRight ? styles['thc-sort-btn--right'] : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={onSort}
        >
          {isRight && <SortIcon />}
          <span className={styles['thc-label']}>{label}</span>
          {!isRight && <SortIcon />}
        </button>
      </div>
    );
  }

  return (
    <div className={rootClasses}>
      <span
        className={[styles['thc-label'], isRight ? styles['thc-label--right'] : '']
          .filter(Boolean)
          .join(' ')}
      >
        {label}
      </span>
    </div>
  );
};

export default TableHeadingCell;
