import React from 'react';
import styles from './Table.module.css';

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

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'right';
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc';
  onSort?: () => void;
}

export interface TableProps {
  columns: TableColumn[];
  rows: Record<string, React.ReactNode>[];
  striped?: boolean;
  className?: string;
}

export const Table: React.FC<TableProps> = ({
  columns,
  rows,
  striped = false,
  className = '',
}) => {
  return (
    <div className={[styles['tbl-wrapper'], className].filter(Boolean).join(' ')} role="region">
      <table className={styles['tbl-root']}>
        <thead>
          <tr>
            {columns.map((col) => {
              const isRight = col.align === 'right';
              const SortIcon =
                col.sortDirection === 'asc'
                  ? SortUpIcon
                  : col.sortDirection === 'desc'
                  ? SortDownIcon
                  : SortDefaultIcon;

              return (
                <th
                  key={col.key}
                  scope="col"
                  className={[
                    styles['tbl-th'],
                    isRight ? styles['tbl-th--right'] : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      className={[
                        styles['tbl-sort-btn'],
                        isRight ? styles['tbl-sort-btn--right'] : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={col.onSort}
                    >
                      {isRight && <SortIcon />}
                      <span>{col.label}</span>
                      {!isRight && <SortIcon />}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={[
                styles['tbl-tr'],
                striped && rowIndex % 2 !== 0 ? styles['tbl-tr--striped'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={[
                    styles['tbl-td'],
                    col.align === 'right' ? styles['tbl-td--right'] : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {row[col.key] ?? null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
