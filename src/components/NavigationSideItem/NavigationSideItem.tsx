import React, { useState } from 'react';
import styles from './NavigationSideItem.module.css';

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------

const ChevronDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoreHorizontal = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="19" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NavigationSideItemType =
  | 'Default'
  | 'Hover'
  | 'Press'
  | 'Selected'
  | 'Focus'
  | 'Header'
  | 'Divider'
  | 'DividerFull'
  | 'Slot'
  | 'Alert'
  | 'Button'
  | 'Search'
  | 'Avatar';

export interface NavigationSideItemProps {
  type?: NavigationSideItemType;
  label?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  showIconRight?: boolean;
  badge?: React.ReactNode;
  badgeCount?: React.ReactNode;
  onClick?: () => void;
  // Alert type
  alertHeading?: string;
  alertBody?: string;
  // Avatar type
  avatarSrc?: string;
  avatarName?: string;
  avatarEmail?: string;
  // Slot type
  slotContent?: React.ReactNode;
  // Search type
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  // Button type
  buttonLabel?: string;
  onButtonClick?: () => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// State → CSS class map for interactive variants
// ---------------------------------------------------------------------------

const STATE_CLASS: Record<string, string> = {
  Default: '',
  Hover: styles['nsi-row--hover'],
  Press: styles['nsi-row--press'],
  Selected: styles['nsi-row--selected'],
  Focus: styles['nsi-row--focus'],
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function NavigationSideItem({
  type = 'Default',
  label,
  icon,
  showIcon = true,
  showIconRight = true,
  badge,
  badgeCount,
  onClick,
  alertHeading,
  alertBody,
  avatarSrc,
  avatarName,
  avatarEmail,
  slotContent,
  searchPlaceholder = 'Buscar…',
  onSearch,
  buttonLabel,
  onButtonClick,
  className = '',
}: NavigationSideItemProps) {
  const [searchValue, setSearchValue] = useState('');

  // --- Header ---
  if (type === 'Header') {
    return (
      <div className={`${styles['nsi-header']} ${className}`}>
        <span className={styles['nsi-header__label']}>{label}</span>
      </div>
    );
  }

  // --- Divider ---
  if (type === 'Divider') {
    return (
      <div className={`${styles['nsi-divider']} ${className}`}>
        <hr className={styles['nsi-divider__line']} />
      </div>
    );
  }

  // --- DividerFull ---
  if (type === 'DividerFull') {
    return (
      <div className={`${styles['nsi-divider-full']} ${className}`}>
        <hr className={styles['nsi-divider__line']} />
      </div>
    );
  }

  // --- Slot ---
  if (type === 'Slot') {
    return (
      <div className={`${styles['nsi-slot']} ${className}`}>
        <div className={styles['nsi-slot__box']}>{slotContent}</div>
      </div>
    );
  }

  // --- Alert ---
  if (type === 'Alert') {
    return (
      <div className={`${styles['nsi-alert']} ${className}`}>
        <div className={styles['nsi-alert__box']}>
          {alertHeading && (
            <p className={styles['nsi-alert__heading']}>{alertHeading}</p>
          )}
          {alertBody && (
            <p className={styles['nsi-alert__body']}>{alertBody}</p>
          )}
        </div>
      </div>
    );
  }

  // --- Button ---
  if (type === 'Button') {
    return (
      <div className={`${styles['nsi-button-wrap']} ${className}`}>
        <button
          type="button"
          className={styles['nsi-button']}
          onClick={onButtonClick}
        >
          {buttonLabel}
        </button>
      </div>
    );
  }

  // --- Search ---
  if (type === 'Search') {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      onSearch?.(e.target.value);
    };

    return (
      <div className={`${styles['nsi-search-wrap']} ${className}`}>
        <div className={styles['nsi-search__inner']}>
          <span className={styles['nsi-search__icon']}>
            <SearchIcon />
          </span>
          <input
            type="search"
            className={styles['nsi-search__input']}
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={handleChange}
            aria-label={searchPlaceholder}
          />
        </div>
      </div>
    );
  }

  // --- Avatar ---
  if (type === 'Avatar') {
    return (
      <div className={`${styles['nsi-avatar-row']} ${className}`}>
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={avatarName ?? 'Avatar'}
            className={styles['nsi-avatar__img']}
          />
        ) : (
          <div className={styles['nsi-avatar__placeholder']} aria-hidden="true">
            {avatarName?.charAt(0).toUpperCase() ?? '?'}
          </div>
        )}
        <div className={styles['nsi-avatar__text']}>
          {avatarName && (
            <span className={styles['nsi-avatar__name']}>{avatarName}</span>
          )}
          {avatarEmail && (
            <span className={styles['nsi-avatar__email']}>{avatarEmail}</span>
          )}
        </div>
        <span className={styles['nsi-avatar__more']}>
          <MoreHorizontal />
        </span>
      </div>
    );
  }

  // --- Interactive types: Default | Hover | Press | Selected | Focus ---
  const stateClass = STATE_CLASS[type] ?? '';

  return (
    <button
      type="button"
      className={`${styles['nsi-row']} ${stateClass} ${className}`}
      onClick={onClick}
    >
      {showIcon && icon && (
        <span className={styles['nsi-row__icon']}>{icon}</span>
      )}
      {label && <span className={styles['nsi-row__label']}>{label}</span>}
      {badge && <span className={styles['nsi-row__badge']}>{badge}</span>}
      {badgeCount && (
        <span className={styles['nsi-row__badge-count']}>{badgeCount}</span>
      )}
      {showIconRight && (
        <span className={styles['nsi-row__chevron']}>
          <ChevronDown />
        </span>
      )}
    </button>
  );
}
