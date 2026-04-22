import React, { useEffect, useId, useRef } from 'react';
import styles from './Modal.module.css';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and handle ESC key while open
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    // Move focus into the panel on open
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the backdrop itself (not the panel) was clicked
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={styles['md-backdrop']}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
    >
      <div
        ref={panelRef}
        className={`${styles['md-panel']} ${styles[`md-panel--${size}`]}`}
        tabIndex={-1}
      >
        {/* Header */}
        <div className={styles['md-header']}>
          {title && (
            <h2 id={titleId} className={styles['md-title']}>
              {title}
            </h2>
          )}
          <button
            className={styles['md-close']}
            onClick={onClose}
            aria-label="Cerrar modal"
            type="button"
          >
            ×
          </button>
        </div>

        {/* Scrollable body */}
        <div className={styles['md-body']}>{children}</div>

        {/* Optional footer */}
        {footer && <div className={styles['md-footer']}>{footer}</div>}
      </div>
    </div>
  );
};
