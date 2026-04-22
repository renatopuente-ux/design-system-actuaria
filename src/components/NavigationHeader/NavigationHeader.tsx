import React, { useState } from 'react';
import styles from './NavigationHeader.module.css';
import { AvatarDropdown, AvatarMenuItem, AvatarUser } from '../AvatarDropdown/AvatarDropdown';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavigationHeaderProps {
  links?: NavLink[];
  user?: AvatarUser;
  userMenuItems?: AvatarMenuItem[];
  onSignOut?: () => void;
  onMenuClick?: () => void;
  logoText?: string;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  links = [],
  user,
  userMenuItems = [],
  onSignOut,
  onMenuClick,
  logoText = 'actuaria+',
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.nh}>
      <div className={styles.nh__inner}>
        {/* Logo */}
        <a href="/" className={styles.nh__logo} aria-label="Ir al inicio">
          <span className={styles.nh__logo_symbol}>◈</span>
          <span className={styles.nh__logo_text}>{logoText}</span>
        </a>

        {/* Desktop nav */}
        <nav className={styles.nh__nav} aria-label="Navegación principal">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={[styles.nh__link, link.active ? styles['nh__link--active'] : ''].filter(Boolean).join(' ')}
              aria-current={link.active ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.nh__actions}>
          {user && (
            <AvatarDropdown
              user={user}
              menuItems={userMenuItems}
              onSignOut={onSignOut}
            />
          )}
          {/* Mobile hamburger */}
          <button
            type="button"
            className={styles.nh__hamburger}
            onClick={() => { setMobileOpen((p) => !p); onMenuClick?.(); }}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className={styles.nh__mobile} aria-label="Menú móvil">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={[styles.nh__mobile_link, link.active ? styles['nh__link--active'] : ''].filter(Boolean).join(' ')}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default NavigationHeader;
