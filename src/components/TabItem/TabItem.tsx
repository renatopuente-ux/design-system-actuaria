import React from 'react';
import styles from './TabItem.module.css';

export interface TabItemProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: number | string;
  onClick?: () => void;
  id?: string;
  'aria-controls'?: string;
  'aria-selected'?: boolean;
  tabIndex?: number;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  className?: string;
}

export const TabItem = React.forwardRef<HTMLButtonElement, TabItemProps>(
  (
    {
      label,
      selected = false,
      disabled = false,
      icon,
      badge,
      onClick,
      id,
      'aria-controls': ariaControls,
      'aria-selected': ariaSelected,
      tabIndex,
      onKeyDown,
      className = '',
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={id}
        aria-selected={ariaSelected ?? selected}
        aria-controls={ariaControls}
        tabIndex={tabIndex ?? (selected ? 0 : -1)}
        disabled={disabled}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={[
          styles['ti-btn'],
          selected ? styles['ti-btn--selected'] : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {icon && <span className={styles['ti-icon']}>{icon}</span>}
        <span className={styles['ti-label']}>{label}</span>
        {badge != null && <span className={styles['ti-badge']}>{badge}</span>}
      </button>
    );
  },
);

TabItem.displayName = 'TabItem';

export default TabItem;
