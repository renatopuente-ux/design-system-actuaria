import React from 'react';
import styles from './NavigationHeader.module.css';
import { NavigationHeaderMenu } from '../NavigationHeaderMenu/NavigationHeaderMenu';

export type NavigationHeaderType = 'Desktop' | 'DesktopAlt' | 'MobileClosed' | 'MobileOpen';

export interface NavLink {
  label: string;
  href?: string;
  selected?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  onClick?: () => void;
}

export interface NavigationHeaderProps {
  type?: NavigationHeaderType;
  logo?: React.ReactNode;
  menuItems?: NavLink[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  showButtons?: boolean;
  primaryButtonLabel?: string;
  onPrimaryButtonClick?: () => void;
  secondaryButtonLabel?: string;
  onSecondaryButtonClick?: () => void;
  showAvatar?: boolean;
  avatarSrc?: string;
  avatarName?: string;
  avatarEmail?: string;
  onAvatarClick?: () => void;
  showBreadcrumbs?: boolean;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  onMenuOpen?: () => void;
  onClose?: () => void;
  className?: string;
}

/* ─── Inline SVG icons ─── */

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10ZM14 14l-2.9-2.9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 6h18M3 12h18M3 18h18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── Sub-components ─── */

interface AvatarDisplayProps {
  avatarSrc?: string;
  avatarName?: string;
  onAvatarClick?: () => void;
}

function AvatarDisplay({ avatarSrc, avatarName, onAvatarClick }: AvatarDisplayProps) {
  const initial = avatarName ? avatarName.charAt(0).toUpperCase() : '?';

  return (
    <button
      type="button"
      className={styles['nh-avatar-dropdown']}
      onClick={onAvatarClick}
      aria-label={avatarName ? `Menú de usuario: ${avatarName}` : 'Menú de usuario'}
    >
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={avatarName ?? 'Avatar'}
          className={styles['nh-avatar-img']}
        />
      ) : (
        <span className={styles['nh-avatar-initials']} aria-hidden="true">
          {initial}
        </span>
      )}
      {avatarName && (
        <span className={styles['nh-avatar-name']}>{avatarName}</span>
      )}
      <span className={styles['nh-avatar-chevron']}>
        <ChevronDownIcon />
      </span>
    </button>
  );
}

interface SearchFieldProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  fullWidth?: boolean;
}

function SearchField({ placeholder = 'Buscar...', onSearch, fullWidth = false }: SearchFieldProps) {
  return (
    <div className={styles['nh-search']}>
      <span className={styles['nh-search-icon']}>
        <SearchIcon />
      </span>
      <input
        type="search"
        className={styles['nh-search-input']}
        placeholder={placeholder}
        style={fullWidth ? { width: '100%' } : undefined}
        onChange={(e) => onSearch?.(e.target.value)}
        aria-label={placeholder}
      />
    </div>
  );
}

interface ButtonsBlockProps {
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  fullWidth?: boolean;
}

function ButtonsBlock({
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  fullWidth = false,
}: ButtonsBlockProps) {
  return (
    <div className={styles['nh-buttons']}>
      {secondaryLabel && (
        <button
          type="button"
          className={fullWidth ? styles['nh-btn-secondary--full'] : styles['nh-btn-secondary']}
          onClick={onSecondary}
        >
          {secondaryLabel}
        </button>
      )}
      {primaryLabel && (
        <button
          type="button"
          className={fullWidth ? styles['nh-btn-primary--full'] : styles['nh-btn-primary']}
          onClick={onPrimary}
        >
          {primaryLabel}
        </button>
      )}
    </div>
  );
}

/* ─── Variant renderers ─── */

function DesktopLayout(props: NavigationHeaderProps, isAlt: boolean) {
  const rootClass = [
    isAlt ? styles['nh-root--desktop-alt'] : styles['nh-root--desktop'],
    props.className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={rootClass}>
      <div className={styles['nh-left']}>
        {props.logo && <div className={styles['nh-logo']}>{props.logo}</div>}
        {props.showBreadcrumbs && props.breadcrumbs && props.breadcrumbs.length > 0 && (
          <nav className={styles['nh-breadcrumbs']} aria-label="Breadcrumb">
            {props.breadcrumbs.map((crumb, i) => {
              const isLast = i === props.breadcrumbs!.length - 1;
              return (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <span className={styles['nh-breadcrumb-sep']} aria-hidden="true">
                      /
                    </span>
                  )}
                  {crumb.href && !isLast ? (
                    <a
                      href={crumb.href}
                      className={styles['nh-breadcrumb-item']}
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span
                      className={[
                        styles['nh-breadcrumb-item'],
                        isLast ? styles['nh-breadcrumb-item--current'] : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-current={isLast ? 'page' : undefined}
                    >
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}
        {props.menuItems && props.menuItems.length > 0 && (
          <nav className={styles['nh-menu']} aria-label="Navegación principal">
            {props.menuItems.map((item, i) => (
              <NavigationHeaderMenu
                key={i}
                label={item.label}
                selected={item.selected}
                icon={item.icon}
                showIcon={item.icon !== undefined}
                badge={item.badge}
                showBadge={item.badge !== undefined}
                onClick={item.onClick}
              />
            ))}
          </nav>
        )}
      </div>
      <div className={styles['nh-right']}>
        {props.showSearch && (
          <SearchField
            placeholder={props.searchPlaceholder}
            onSearch={props.onSearch}
          />
        )}
        {props.showButtons && (
          <ButtonsBlock
            primaryLabel={props.primaryButtonLabel}
            onPrimary={props.onPrimaryButtonClick}
            secondaryLabel={props.secondaryButtonLabel}
            onSecondary={props.onSecondaryButtonClick}
          />
        )}
        {props.showAvatar && (
          <AvatarDisplay
            avatarSrc={props.avatarSrc}
            avatarName={props.avatarName}
            onAvatarClick={props.onAvatarClick}
          />
        )}
      </div>
    </header>
  );
}

function MobileClosedLayout(props: NavigationHeaderProps) {
  const rootClass = [styles['nh-root--mobile-closed'], props.className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <header className={rootClass}>
      {props.logo && <div className={styles['nh-logo']}>{props.logo}</div>}
      <div className={styles['nh-mobile-right']}>
        {props.showAvatar && (
          <AvatarDisplay
            avatarSrc={props.avatarSrc}
            avatarName={props.avatarName}
            onAvatarClick={props.onAvatarClick}
          />
        )}
        <button
          type="button"
          className={styles['nh-hamburger-btn']}
          onClick={props.onMenuOpen}
          aria-label="Abrir menú"
          aria-expanded={false}
        >
          <HamburgerIcon />
        </button>
      </div>
    </header>
  );
}

function MobileOpenLayout(props: NavigationHeaderProps) {
  return (
    <>
      <div
        className={styles['nh-overlay']}
        onClick={props.onClose}
        aria-hidden="true"
      />
      <div
        className={styles['nh-sidenav']}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Header row */}
        <div className={styles['nh-sidenav-header']}>
          {props.logo && <div className={styles['nh-logo']}>{props.logo}</div>}
          <button
            type="button"
            className={styles['nh-close-btn']}
            onClick={props.onClose}
            aria-label="Cerrar menú"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Search */}
        {props.showSearch && (
          <div className={styles['nh-sidenav-search']}>
            <SearchField
              placeholder={props.searchPlaceholder}
              onSearch={props.onSearch}
              fullWidth
            />
          </div>
        )}

        {/* Menu items */}
        <nav className={styles['nh-sidenav-menu']} aria-label="Navegación principal">
          {props.menuItems?.map((item, i) => (
            <button
              key={i}
              type="button"
              className={[
                styles['nh-mobile-menu-item'],
                item.selected ? styles['nh-mobile-menu-item--selected'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={item.onClick}
              aria-current={item.selected ? 'page' : undefined}
            >
              {item.icon && <span aria-hidden="true">{item.icon}</span>}
              {item.label}
              {item.badge && <span>{item.badge}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        {(props.showButtons || props.showAvatar) && (
          <div className={styles['nh-sidenav-footer']}>
            {props.showButtons && (
              <ButtonsBlock
                primaryLabel={props.primaryButtonLabel}
                onPrimary={props.onPrimaryButtonClick}
                secondaryLabel={props.secondaryButtonLabel}
                onSecondary={props.onSecondaryButtonClick}
                fullWidth
              />
            )}
            {props.showAvatar && (
              <AvatarDisplay
                avatarSrc={props.avatarSrc}
                avatarName={props.avatarName}
                onAvatarClick={props.onAvatarClick}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

/* ─── Main export ─── */

export function NavigationHeader(props: NavigationHeaderProps) {
  const type = props.type ?? 'Desktop';

  switch (type) {
    case 'DesktopAlt':
      return DesktopLayout(props, true);
    case 'MobileClosed':
      return MobileClosedLayout(props);
    case 'MobileOpen':
      return MobileOpenLayout(props);
    case 'Desktop':
    default:
      return DesktopLayout(props, false);
  }
}

export default NavigationHeader;
