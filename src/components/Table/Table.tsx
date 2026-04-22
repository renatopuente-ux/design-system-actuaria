import React from 'react';
import styles from './Table.module.css';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps {
  columns: TableColumn[];
  rows: Record<string, React.ReactNode>[];
  striped?: boolean;
  hoverable?: boolean;
}

export const Table: React.FC<TableProps> = ({
  columns,
  rows,
  striped = false,
  hoverable = false,
}) => {
  return (
    <div className={styles['tbl-wrapper']} role="region" aria-label="tabla de datos">
      <table className={styles['tbl-root']}>
        <thead className={styles['tbl-head']}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={styles['tbl-th']}
                style={{ textAlign: col.align ?? 'left' }}
                scope="col"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={[
                styles['tbl-tr'],
                striped && rowIndex % 2 !== 0 ? styles['tbl-tr--striped'] : '',
                hoverable ? styles['tbl-tr--hoverable'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={styles['tbl-td']}
                  style={{ textAlign: col.align ?? 'left' }}
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
