import React from 'react';
import styles from './EmptyState.module.css';
import { Button } from '../Button/Button';

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
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
  action,
  size = 'md',
  className = '',
}) => {
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
      {action && (
        <Button variant="primary" size="md" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
