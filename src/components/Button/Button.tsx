import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  onClick,
  children,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      className={[
        styles.btn,
        styles[`btn--${variant}`],
        styles[`btn--${size}`],
        loading ? styles['btn--loading'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {loading && (
        <span className={styles['btn__spinner']} aria-hidden="true" />
      )}
      {!loading && iconLeft && (
        <span className={styles['btn__icon-left']} aria-hidden="true">
          {iconLeft}
        </span>
      )}
      <span className={styles['btn__label']}>{children}</span>
      {!loading && iconRight && (
        <span className={styles['btn__icon-right']} aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
};

export default Button;
