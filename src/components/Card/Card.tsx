import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  role?: string;
  'aria-label'?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  shadow = true,
  onClick,
  className = '',
  role,
  'aria-label': ariaLabel,
}) => {
  const isClickable = Boolean(onClick);

  return (
    <div
      className={[
        styles.cd,
        styles[`cd--padding-${padding}`],
        shadow ? styles['cd--shadow'] : '',
        isClickable ? styles['cd--clickable'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      role={role ?? (isClickable ? 'button' : undefined)}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={isClickable ? (e) => { if (e.key === 'Enter') onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>); } : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
