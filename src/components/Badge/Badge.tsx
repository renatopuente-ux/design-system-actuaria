import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
}) => {
  return (
    <span
      className={[
        styles['bdg-root'],
        styles[`bdg-root--${variant}`],
        styles[`bdg-root--${size}`],
      ].join(' ')}
      aria-label={label}
    >
      {label}
    </span>
  );
};

export default Badge;
