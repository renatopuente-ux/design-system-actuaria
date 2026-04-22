import React, { useEffect } from 'react';
import styles from './Drawer.module.css';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  width?: string;
  title?: string;
  children: React.ReactNode;
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  position = 'right',
  width = '320px',
  title,
  children,
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.dr} role="dialog" aria-modal="true" aria-label={title ?? 'Panel lateral'}>
      {/* Overlay */}
      <div className={styles.dr__overlay} onClick={onClose} aria-hidden="true" />
      {/* Panel */}
      <div
        className={[styles.dr__panel, styles[`dr__panel--${position}`]].join(' ')}
        style={{ width }}
      >
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
      </div>
    </div>
  );
};

export default Drawer;
