import React, { useEffect } from 'react';
import styles from './Drawer.module.css';

export type DrawerSize = 'Small' | 'Large';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: DrawerSize;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24" aria-hidden="true">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  size = 'Small',
  children,
  footer,
  className,
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const panelClass = [
    styles.dr__panel,
    size === 'Large' ? styles['dr__panel--large'] : styles['dr__panel--small'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={styles.dr}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Panel lateral'}
    >
      <div
        className={styles.dr__overlay}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={panelClass}>
        <div className={styles.dr__header}>
          {title && <h2 className={styles.dr__title}>{title}</h2>}
          <button
            type="button"
            className={styles.dr__close}
            onClick={onClose}
            aria-label="Cerrar panel"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.dr__body}>{children}</div>

        {footer && (
          <div className={styles.dr__footer}>{footer}</div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
