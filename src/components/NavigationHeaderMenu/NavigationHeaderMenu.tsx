import React from 'react';
import styles from './NavigationHeaderMenu.module.css';

export type NavigationHeaderMenuState = 'Default' | 'Hover' | 'Press' | 'Focus' | 'Disabled';

export interface NavigationHeaderMenuProps {
  label: string;
  selected?: boolean;
  state?: NavigationHeaderMenuState;
  icon?: React.ReactNode;
  showIcon?: boolean;
  badge?: React.ReactNode;
  showBadge?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavigationHeaderMenu({
  label,
  selected = false,
  state = 'Default',
  icon,
  showIcon = false,
  badge,
  showBadge = false,
  onClick,
  className,
}: NavigationHeaderMenuProps) {
  const isDisabled = state === 'Disabled';

  const rootClass = [
    styles['nhm-root'],
    selected ? styles['nhm-root--selected'] : '',
    state === 'Hover' ? styles['nhm-root--hover'] : '',
    state === 'Press' ? styles['nhm-root--press'] : '',
    state === 'Focus' ? styles['nhm-root--focus'] : '',
    isDisabled ? styles['nhm-root--disabled'] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={rootClass}
      onClick={onClick}
      disabled={isDisabled}
      aria-current={selected ? 'page' : undefined}
    >
      {showIcon && icon && (
        <span className={styles['nhm-icon']} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles['nhm-label']}>{label}</span>
      {showBadge && badge && (
        <span className={styles['nhm-badge']}>{badge}</span>
      )}
    </button>
  );
}
