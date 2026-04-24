import React from 'react';
import styles from './TableDataCell.module.css';

const TrendUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M7 17l5-5 5 5" stroke="var(--text-success, #4caf50)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M7 7l5 5 5-5" stroke="var(--text-error, #c73a3a)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export type TableDataCellType =
  | 'text'
  | 'text-bold'
  | 'number'
  | 'link'
  | 'secondary-text'
  | 'badge'
  | 'tags'
  | 'avatar'
  | 'avatar-group'
  | 'checkbox'
  | 'action-icons'
  | 'action-links';

export type TableDataCellColour = 'Default' | 'Alternate';

export interface TableDataCellProps {
  type?: TableDataCellType;
  colour?: TableDataCellColour;
  trendDirection?: 'up' | 'down' | 'none';
  children?: React.ReactNode;
  className?: string;
}

export const TableDataCell: React.FC<TableDataCellProps> = ({
  type = 'text',
  colour = 'Default',
  trendDirection,
  children,
  className = '',
}) => {
  const isNumber = type === 'number';
  const isActions = type === 'action-icons' || type === 'action-links';
  const isCheckbox = type === 'checkbox';

  const rootClasses = [
    styles['tdc-root'],
    colour === 'Alternate' ? styles['tdc-root--alternate'] : '',
    isNumber ? styles['tdc-root--number'] : '',
    isActions ? styles['tdc-root--actions'] : '',
    isCheckbox ? styles['tdc-root--checkbox'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentClasses = [
    styles['tdc-content'],
    type === 'text-bold' ? styles['tdc-content--bold'] : '',
    isNumber ? styles['tdc-content--number'] : '',
    type === 'link' ? styles['tdc-content--link'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      <div className={contentClasses}>{children}</div>
      {isNumber && trendDirection === 'up' && <TrendUpIcon />}
      {isNumber && trendDirection === 'down' && <TrendDownIcon />}
    </div>
  );
};

export default TableDataCell;
