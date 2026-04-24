import React, { useEffect, useId, useRef } from 'react';
import styles from './Modal.module.css';

export type ModalTone = 'Default' | 'Destructive';
export type ModalSize = 'Small' | 'Large';

export interface ModalAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  tone?: ModalTone;
  size?: ModalSize;
  /** Show X close button */
  dismissible?: boolean;
  /** Icon element rendered in icon container */
  icon?: React.ReactNode;
  /** Heading text */
  heading?: string;
  /** Secondary body text */
  secondaryText?: string;
  /** Image URL — shown as banner above content */
  image?: string;
  /** Slot content areas (up to 5) */
  slots?: React.ReactNode[];
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  /** Extra content rendered after slots */
  children?: React.ReactNode;
}

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  tone = 'Default',
  size = 'Small',
  dismissible = false,
  icon,
  heading,
  secondaryText,
  image,
  slots,
  primaryAction,
  secondaryAction,
  children,
}) => {
  const headingId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const isDestructive = tone === 'Destructive';
  const hasButtons = primaryAction || secondaryAction;
  const hasContent = heading || secondaryText || icon;

  return (
    <div
      className={styles['md-backdrop']}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={heading ? headingId : undefined}
    >
      <div
        ref={panelRef}
        className={[
          styles['md-panel'],
          styles[`md-panel--${size.toLowerCase()}`],
          isDestructive ? styles['md-panel--destructive'] : '',
        ].filter(Boolean).join(' ')}
        tabIndex={-1}
      >
        {/* Optional image banner */}
        {image && (
          <img src={image} alt="" className={styles['md-image']} aria-hidden="true" />
        )}

        {/* Content: icon + text */}
        {hasContent && (
          <div className={styles['md-content']}>
            {icon && (
              <span
                className={[
                  styles['md-icon'],
                  isDestructive ? styles['md-icon--destructive'] : '',
                ].filter(Boolean).join(' ')}
              >
                {icon}
              </span>
            )}
            {(heading || secondaryText) && (
              <div className={[styles['md-text'], dismissible ? styles['md-text--dismissible'] : ''].filter(Boolean).join(' ')}>
                {heading && (
                  <h2 id={headingId} className={styles['md-heading']}>{heading}</h2>
                )}
                {secondaryText && (
                  <p className={styles['md-secondary']}>{secondaryText}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Slot areas */}
        {slots && slots.length > 0 && slots.map((slot, i) =>
          slot ? (
            <div key={i} className={styles['md-slot']}>{slot}</div>
          ) : null
        )}

        {/* Arbitrary children */}
        {children && <div className={styles['md-children']}>{children}</div>}

        {/* Button group */}
        {hasButtons && (
          <div className={styles['md-actions']}>
            {secondaryAction && (
              <button
                type="button"
                className={[
                  styles['md-btn'],
                  styles['md-btn--secondary'],
                  isDestructive ? styles['md-btn--secondary-destructive'] : '',
                ].filter(Boolean).join(' ')}
                onClick={secondaryAction.onClick}
                disabled={secondaryAction.disabled}
              >
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button
                type="button"
                className={[
                  styles['md-btn'],
                  styles['md-btn--primary'],
                  isDestructive ? styles['md-btn--primary-destructive'] : '',
                ].filter(Boolean).join(' ')}
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
              >
                {primaryAction.label}
              </button>
            )}
          </div>
        )}

        {/* Dismiss button */}
        {dismissible && (
          <button
            type="button"
            className={styles['md-close']}
            onClick={onClose}
            aria-label="Cerrar"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};
