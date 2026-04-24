import React from 'react';
import styles from './Footer.module.css';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export type FooterSize = 'Small' | 'Large';

export interface FooterProps {
  logo?: React.ReactNode;
  description?: string;
  navLinks?: FooterLink[];
  columns?: FooterColumn[];
  legal?: string;
  socialLinks?: SocialLink[];
  size?: FooterSize;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logo,
  description,
  navLinks = [],
  columns = [],
  legal,
  socialLinks = [],
  size = 'Large',
  className,
}) => {
  const rootClass = [
    styles['ft-root'],
    size === 'Small' ? styles['ft-root--small'] : styles['ft-root--large'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const socialList = socialLinks.length > 0 && (
    <div className={styles['ft-social']} role="list" aria-label="Redes sociales">
      {socialLinks.map((social) => (
        <a
          key={social.href}
          href={social.href}
          className={styles['ft-social-link']}
          aria-label={social.label}
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );

  if (size === 'Small') {
    return (
      <footer className={rootClass} role="contentinfo">
        <div className={styles['ft-inner']}>
          {/* Desktop: single bar — logo | nav | social */}
          {/* Tablet/Mobile: stacked via CSS breakpoints */}
          <div className={styles['ft-sm-top']}>
            {logo && (
              <div className={styles['ft-logo']} aria-label="Logo">
                {logo}
              </div>
            )}

            {navLinks.length > 0 && (
              <nav className={styles['ft-sm-nav']} aria-label="Footer navigation">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className={styles['ft-link']}>
                    {link.label}
                  </a>
                ))}
              </nav>
            )}

            {socialList}
          </div>

          {/* Copyright row with top border */}
          {legal && (
            <div className={styles['ft-sm-bottom']}>
              <p className={styles['ft-legal']}>{legal}</p>
            </div>
          )}
        </div>
      </footer>
    );
  }

  // size === 'Large'
  return (
    <footer className={rootClass} role="contentinfo">
      <div className={styles['ft-inner']}>
        {/* Top section */}
        <div className={styles['ft-lg-top']}>
          {/* Left block: logo + description */}
          <div className={styles['ft-lg-left']}>
            {logo && (
              <div className={styles['ft-logo']} aria-label="Logo">
                {logo}
              </div>
            )}
            {description && (
              <p className={styles['ft-description']}>{description}</p>
            )}
          </div>

          {/* Right block: topic columns */}
          {columns.length > 0 && (
            <nav className={styles['ft-lg-columns']} aria-label="Footer navigation">
              {columns.map((col) => (
                <div key={col.title} className={styles['ft-column']}>
                  <h3 className={styles['ft-column-title']}>{col.title}</h3>
                  <ul className={styles['ft-column-list']} role="list">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} className={styles['ft-link']}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}
        </div>

        {/* Bottom bar: copyright + social */}
        <div className={styles['ft-lg-bottom']}>
          {legal && <p className={styles['ft-legal']}>{legal}</p>}
          {socialList}
        </div>
      </div>
    </footer>
  );
};
