import React from 'react';
import styles from './SummaryList.module.css';

export interface SummaryListRow {
  term: string;
  description: React.ReactNode;
  /** Optional action slot — accepts any ReactNode (links, icon buttons, etc.) */
  action?: React.ReactNode;
}

export interface SummaryListProps {
  rows: SummaryListRow[];
  className?: string;
}

export const SummaryList: React.FC<SummaryListProps> = ({ rows, className = '' }) => {
  const hasActions = rows.some((r) => r.action != null);

  return (
    <div className={[styles['sl-root'], className].filter(Boolean).join(' ')}>
      {/* Terms column */}
      <div className={styles['sl-col']}>
        {rows.map((row, i) => (
          <div key={i} className={[styles['sl-cell'], styles['sl-cell--term']].join(' ')}>
            <span className={styles['sl-term']}>{row.term}</span>
          </div>
        ))}
      </div>

      {/* Description column */}
      <div className={styles['sl-col']}>
        {rows.map((row, i) => (
          <div key={i} className={[styles['sl-cell'], styles['sl-cell--description']].join(' ')}>
            <span className={styles['sl-description']}>{row.description}</span>
          </div>
        ))}
      </div>

      {/* Action column — only rendered when at least one row has an action */}
      {hasActions && (
        <div className={styles['sl-col']}>
          {rows.map((row, i) => (
            <div key={i} className={[styles['sl-cell'], styles['sl-cell--action']].join(' ')}>
              {row.action ?? null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryList;
