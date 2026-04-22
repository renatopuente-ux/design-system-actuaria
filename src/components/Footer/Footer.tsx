import React from 'react';
import styles from './Footer.module.css';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  logo?: React.ReactNode;
  columns?: FooterColumn[];
  legal?: string;
  socialLinks?: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({
  logo,
  columns = [],
  legal,
  socialLinks = [],
}) => {
  return (
    <footer className={styles['ft-root']} role="contentinfo">
      <div className={styles['ft-inner']}>
        {/* Top row: logo + columns */}
        <div className={styles['ft-top']}>
          {logo && (
            <div className={styles['ft-logo']} aria-label="Logo">
              {logo}
            </div>
          )}

          {columns.length > 0 && (
            <nav className={styles['ft-columns']} aria-label="Footer navigation">
              {columns.map((col) => (
                <div key={col.title} className={styles['ft-column']}>
                  <h3 className={styles['ft-column-title']}>{col.title}</h3>
                  <ul className={styles['ft-column-list']} role="list">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className={styles['ft-link']}
                        >
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

        {/* Divider */}
        <hr className={styles['ft-divider']} aria-hidden="true" />

        {/* Bottom row: legal + social */}
        <div className={styles['ft-bottom']}>
          {legal && (
            <p className={styles['ft-legal']}>{legal}</p>
          )}

          {socialLinks.length > 0 && (
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
          )}
        </div>
      </div>
    </footer>
  );
};
