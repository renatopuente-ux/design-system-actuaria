import React from 'react';
import styles from './EmptyState.module.css';

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  /** Primary CTA — navy bg, white text */
  primaryAction?: EmptyStateAction;
  /** Secondary CTA — outlined navy */
  secondaryAction?: EmptyStateAction;
  /** Ghost/link CTA — orange underlined, no border */
  ghostAction?: EmptyStateAction;
  /** @deprecated Use primaryAction instead */
  action?: EmptyStateAction;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DefaultIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  ghostAction,
  action,
  size = 'md',
  className = '',
}) => {
  const primary = primaryAction ?? action;
  const hasActions = primary || secondaryAction || ghostAction;

  return (
    <div
      className={[styles.es, styles[`es--${size}`], className].filter(Boolean).join(' ')}
      role="status"
      aria-label={title}
    >
      <div className={styles.es__icon}>
        {icon ?? <DefaultIcon />}
      </div>
      <div className={styles.es__content}>
        <p className={styles.es__title}>{title}</p>
        {description && <p className={styles.es__description}>{description}</p>}
      </div>
      {hasActions && (
        <div className={styles.es__actions}>
          {primary && (
            <button type="button" className={styles['es__btn--primary']} onClick={primary.onClick}>
              {primary.label}
            </button>
          )}
          {secondaryAction && (
            <button type="button" className={styles['es__btn--secondary']} onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </button>
          )}
          {ghostAction && (
            <button type="button" className={styles['es__btn--ghost']} onClick={ghostAction.onClick}>
              {ghostAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
