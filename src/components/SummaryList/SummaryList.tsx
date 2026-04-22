import React from 'react';
import styles from './SummaryList.module.css';

export interface SummaryListItem {
  label: string;
  value: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface SummaryListProps {
  items: SummaryListItem[];
}

export const SummaryList: React.FC<SummaryListProps> = ({ items }) => {
  return (
    <dl className={styles['sl2-root']}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className={styles['sl2-row']}>
            <dt className={styles['sl2-label']}>{item.label}</dt>

            <dd className={styles['sl2-value']}>{item.value}</dd>

            {item.action && (
              <button
                type="button"
                className={styles['sl2-action']}
                onClick={item.action.onClick}
              >
                {item.action.label}
              </button>
            )}
          </div>

          {/* Divider between rows — not after the last item */}
          {index < items.length - 1 && (
            <div className={styles['sl2-divider']} role="separator" />
          )}
        </React.Fragment>
      ))}
    </dl>
  );
};

export default SummaryList;
