import React from 'react';
import styles from './PageSingle.module.css';

export type PageSingleState = 'Default' | 'Hover' | 'Press' | 'Focus' | 'Disabled';

export interface PageSingleProps {
  page: number | string;
  selected?: boolean;
  state?: PageSingleState;
  onClick?: () => void;
  className?: string;
}

export const PageSingle: React.FC<PageSingleProps> = ({
  page,
  selected = false,
  state = 'Default',
  onClick,
  className,
}) => {
  const isDisabled = state === 'Disabled';

  return (
    <button
      type="button"
      className={[
        styles['ps-root'],
        selected ? styles['ps-root--selected'] : '',
        styles[`ps-root--${state.toLowerCase()}`],
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      disabled={isDisabled}
      aria-current={selected ? 'page' : undefined}
      aria-label={`Página ${page}`}
    >
      <span className={styles['ps-label']}>{page}</span>
    </button>
  );
};

export default PageSingle;
