import React from 'react';
import { NavigationSideItem } from '../NavigationSideItem/NavigationSideItem';
import type { NavigationSideItemProps } from '../NavigationSideItem/NavigationSideItem';
import styles from './NavigationSide.module.css';

// ---------------------------------------------------------------------------
// Inline SVG — hamburger menu icon
// ---------------------------------------------------------------------------

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NavigationSideType = 'Desktop' | 'MobileClosed' | 'MobileOpen' | 'Glass';

export interface NavigationSideProps {
  type?: NavigationSideType;
  logo?: React.ReactNode;
  items?: NavigationSideItemProps[];
  bottomItems?: NavigationSideItemProps[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  showAlert?: boolean;
  alertHeading?: string;
  alertBody?: string;
  showButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
  showAvatar?: boolean;
  avatarSrc?: string;
  avatarName?: string;
  avatarEmail?: string;
  showSlot?: boolean;
  slotContent?: React.ReactNode;
  onClose?: () => void;
  onMenuOpen?: () => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Internal: shared middle + bottom zones
// ---------------------------------------------------------------------------

interface SideZonesProps {
  items?: NavigationSideItemProps[];
  bottomItems?: NavigationSideItemProps[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  showAlert?: boolean;
  alertHeading?: string;
  alertBody?: string;
  showButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
  showAvatar?: boolean;
  avatarSrc?: string;
  avatarName?: string;
  avatarEmail?: string;
  showSlot?: boolean;
  slotContent?: React.ReactNode;
}

function SideZones({
  items = [],
  bottomItems = [],
  showSearch,
  searchPlaceholder,
  onSearch,
  showAlert,
  alertHeading,
  alertBody,
  showButton,
  buttonLabel,
  onButtonClick,
  showAvatar,
  avatarSrc,
  avatarName,
  avatarEmail,
  showSlot,
  slotContent,
}: SideZonesProps) {
  return (
    <>
      {/* Middle zone — scrollable nav items */}
      <div className={styles['ns-middle']}>
        {items.map((item, index) => (
          <NavigationSideItem key={index} {...item} />
        ))}
      </div>

      {/* Bottom zone — utility items */}
      <div className={styles['ns-bottom']}>
        {showAlert && (
          <NavigationSideItem
            type="Alert"
            alertHeading={alertHeading}
            alertBody={alertBody}
          />
        )}
        {showSlot && (
          <NavigationSideItem type="Slot" slotContent={slotContent} />
        )}
        {showButton && (
          <NavigationSideItem
            type="Button"
            buttonLabel={buttonLabel}
            onButtonClick={onButtonClick}
          />
        )}
        {showAvatar && (
          <NavigationSideItem
            type="Avatar"
            avatarSrc={avatarSrc}
            avatarName={avatarName}
            avatarEmail={avatarEmail}
          />
        )}
        {bottomItems.map((item, index) => (
          <NavigationSideItem key={index} {...item} />
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function NavigationSide({
  type = 'Desktop',
  logo,
  items = [],
  bottomItems = [],
  showSearch,
  searchPlaceholder,
  onSearch,
  showAlert,
  alertHeading,
  alertBody,
  showButton,
  buttonLabel,
  onButtonClick,
  showAvatar,
  avatarSrc,
  avatarName,
  avatarEmail,
  showSlot,
  slotContent,
  onClose,
  onMenuOpen,
  className = '',
}: NavigationSideProps) {
  // --- MobileClosed: topbar only ---
  if (type === 'MobileClosed') {
    return (
      <header className={`${styles['ns-root--mobile-closed']} ${className}`}>
        <div className={styles['ns-mobile-bar']}>
          {logo}
          <div className={styles['ns-mobile-bar__actions']}>
            {showAvatar && avatarSrc && (
              <img
                src={avatarSrc}
                alt={avatarName ?? 'Avatar'}
                className={styles['ns-mobile-avatar']}
              />
            )}
            <button
              type="button"
              className={styles['ns-menu-btn']}
              onClick={onMenuOpen}
              aria-label="Abrir menú"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // --- MobileOpen: full-screen overlay with drawer ---
  if (type === 'MobileOpen') {
    return (
      <div
        className={styles['ns-mobile-overlay']}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <nav
          className={`${styles['ns-root--mobile-open']} ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top zone */}
          <div className={styles['ns-top']}>
            <button
              type="button"
              className={styles['ns-close-btn']}
              onClick={onClose}
              aria-label="Cerrar menú"
            >
              <CloseIcon />
            </button>
            {showSearch && (
              <NavigationSideItem
                type="Search"
                searchPlaceholder={searchPlaceholder}
                onSearch={onSearch}
              />
            )}
          </div>

          <SideZones
            items={items}
            bottomItems={bottomItems}
            showAlert={showAlert}
            alertHeading={alertHeading}
            alertBody={alertBody}
            showButton={showButton}
            buttonLabel={buttonLabel}
            onButtonClick={onButtonClick}
            showAvatar={showAvatar}
            avatarSrc={avatarSrc}
            avatarName={avatarName}
            avatarEmail={avatarEmail}
            showSlot={showSlot}
            slotContent={slotContent}
          />
        </nav>
      </div>
    );
  }

  // --- Desktop / Glass ---
  const rootClass =
    type === 'Glass'
      ? styles['ns-root--glass']
      : styles['ns-root--desktop'];

  return (
    <nav
      className={`${rootClass} ${className}`}
      aria-label="Navegación principal"
    >
      {/* Top zone */}
      <div className={styles['ns-top']}>
        <div className={styles['ns-logo']}>{logo}</div>
        {showSearch && (
          <NavigationSideItem
            type="Search"
            searchPlaceholder={searchPlaceholder}
            onSearch={onSearch}
          />
        )}
      </div>

      <SideZones
        items={items}
        bottomItems={bottomItems}
        showAlert={showAlert}
        alertHeading={alertHeading}
        alertBody={alertBody}
        showButton={showButton}
        buttonLabel={buttonLabel}
        onButtonClick={onButtonClick}
        showAvatar={showAvatar}
        avatarSrc={avatarSrc}
        avatarName={avatarName}
        avatarEmail={avatarEmail}
        showSlot={showSlot}
        slotContent={slotContent}
      />
    </nav>
  );
}
