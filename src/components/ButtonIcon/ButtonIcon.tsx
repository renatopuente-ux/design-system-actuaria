import React from 'react';
import styles from './ButtonIcon.module.css';

export interface ButtonIconProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon: React.ReactNode;
  ariaLabel: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  ariaLabel,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      className={[
        styles.bi,
        styles[`bi--${variant}`],
        styles[`bi--${size}`],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className={styles.bi__icon} aria-hidden="true">
        {icon}
      </span>
    </button>
  );
};

export default ButtonIcon;
