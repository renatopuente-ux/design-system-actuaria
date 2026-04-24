/* ═══════════════════════════════════════════════════════════════
   ButtonIcon — Actuaria Design System
   Figma node: 6174:62119  ·  fileKey: N1wh3u4sX3UGyUU5oWOaz6
   ═══════════════════════════════════════════════════════════════ */
import React from 'react';
import styles from './ButtonIcon.module.css';

export type ButtonIconVariant = 'Primary' | 'Secondary' | 'Tertiary';
export type ButtonIconTone    = 'Brand' | 'Neutral' | 'Inverse' | 'Destructive';
export type ButtonIconSize    = 'Medium' | 'Small';
export type ButtonIconShape   = 'Square' | 'Circle';

export interface ButtonIconProps {
  variant?:    ButtonIconVariant;
  tone?:       ButtonIconTone;
  size?:       ButtonIconSize;
  shape?:      ButtonIconShape;
  disabled?:   boolean;
  loading?:    boolean;
  badgeDot?:   boolean;
  badgeCount?: number;
  icon:        React.ReactNode;
  ariaLabel:   string;
  onClick?:    (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?:       'button' | 'submit' | 'reset';
  className?:  string;
}

const ICON_SIZE: Record<ButtonIconSize, number> = { Medium: 24, Small: 16 };

export function ButtonIcon({
  variant    = 'Primary',
  tone       = 'Brand',
  size       = 'Medium',
  shape      = 'Square',
  disabled   = false,
  loading    = false,
  badgeDot   = false,
  badgeCount,
  icon,
  ariaLabel,
  onClick,
  type       = 'button',
  className,
}: ButtonIconProps) {
  const iconPx = ICON_SIZE[size];

  return (
    <button
      type={type}
      className={[
        styles['bi-root'],
        styles[`bi-variant--${variant.toLowerCase()}`],
        styles[`bi-tone--${tone.toLowerCase()}`],
        styles[`bi-size--${size.toLowerCase()}`],
        styles[`bi-shape--${shape.toLowerCase()}`],
        loading ? styles['bi--loading'] : '',
        className,
      ].filter(Boolean).join(' ')}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <span className={styles['bi-spinner']} aria-hidden="true" />
      ) : (
        <span className={styles['bi-icon']} aria-hidden="true"
          style={{ width: iconPx, height: iconPx }}>
          {icon}
        </span>
      )}
      {badgeDot && !loading && (
        <span className={styles['bi-badge-dot']} aria-hidden="true" />
      )}
      {badgeCount !== undefined && !loading && (
        <span className={styles['bi-badge-count']} aria-hidden="true">
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      )}
    </button>
  );
}

export default ButtonIcon;
