import React from 'react';
import styles from './TextLink.module.css';

interface TextLinkProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  /** Renders ↗ icon and adds target="_blank" rel="noopener noreferrer" */
  external?: boolean;
  size?: 'sm' | 'md';
}

/** External link icon — inline SVG, no icon library dependency */
const ExternalIcon: React.FC = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    className={styles['tl-external-icon']}
  >
    <path
      d="M2.5 9.5L9.5 2.5M9.5 2.5H5.5M9.5 2.5V6.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TextLink: React.FC<TextLinkProps> = ({
  href,
  onClick,
  children,
  external = false,
  size = 'md',
}) => {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  const className = [
    styles['tl-root'],
    size === 'sm' ? styles['tl-root--sm'] : styles['tl-root--md'],
  ].join(' ');

  // Render as <a> when href is provided, otherwise as <button> for onClick-only usage
  if (href) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        {...externalProps}
        aria-label={external ? `${String(children)} (abre en pestaña nueva)` : undefined}
      >
        {children}
        {external && <ExternalIcon />}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
    >
      {children}
      {external && <ExternalIcon />}
    </button>
  );
};
