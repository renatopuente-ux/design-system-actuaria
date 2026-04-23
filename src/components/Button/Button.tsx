/* ═══════════════════════════════════════════════════════════════
   Button — Actuaria Design System
   Figma node: 3433:80097  ·  fileKey: N1wh3u4sX3UGyUU5oWOaz6
   ═══════════════════════════════════════════════════════════════ */
import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'Primary' | 'Secondary' | 'Tertiary';
export type ButtonTone    = 'Brand' | 'Neutral' | 'Inverse' | 'Destructive';
export type ButtonSize    = 'Large' | 'Medium' | 'Small';

export interface ButtonProps {
  variant?:   ButtonVariant;
  tone?:      ButtonTone;
  size?:      ButtonSize;
  disabled?:  boolean;
  loading?:   boolean;
  iconLeft?:  React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?:   (e: React.MouseEvent<HTMLButtonElement>) => void;
  children:   React.ReactNode;
  /** HTML button type */
  type?:      'button' | 'submit' | 'reset';
  className?: string;
}

const ICON_SIZE: Record<ButtonSize, number> = {
  Large: 24, Medium: 20, Small: 16,
};

export function Button({
  variant   = 'Primary',
  tone      = 'Brand',
  size      = 'Medium',
  disabled  = false,
  loading   = false,
  iconLeft,
  iconRight,
  onClick,
  children,
  type      = 'button',
  className,
}: ButtonProps) {
  const iconPx = ICON_SIZE[size];

  return (
    <button
      type={type}
      className={[
        styles['btn-root'],
        styles[`btn-variant--${variant.toLowerCase()}`],
        styles[`btn-tone--${tone.toLowerCase()}`],
        styles[`btn-size--${size.toLowerCase()}`],
        loading ? styles['btn--loading'] : '',
        className,
      ].filter(Boolean).join(' ')}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading || undefined}
    >
      {loading && (
        <span className={styles['btn-spinner']} aria-hidden="true" />
      )}
      {!loading && iconLeft && (
        <span className={styles['btn-icon']} aria-hidden="true"
          style={{ width: iconPx, height: iconPx }}>
          {iconLeft}
        </span>
      )}
      <span className={styles['btn-label']}>{children}</span>
      {!loading && iconRight && (
        <span className={styles['btn-icon']} aria-hidden="true"
          style={{ width: iconPx, height: iconPx }}>
          {iconRight}
        </span>
      )}
    </button>
  );
}

export default Button;
