/* ═══════════════════════════════════════════════════════════════
   BadgeDot — Actuaria Design System
   Figma node: 6412:85981  ·  fileKey: N1wh3u4sX3UGyUU5oWOaz6
   ═══════════════════════════════════════════════════════════════ */
import React from 'react';
import styles from './BadgeDot.module.css';

export type BadgeDotType = 'Online' | 'Busy' | 'Away' | 'Offline' | 'Notification';
export type BadgeDotSize = 'Large' | 'Medium' | 'Small';

export interface BadgeDotProps {
  type?:      BadgeDotType;
  size?:      BadgeDotSize;
  /** White ring outline — used when placed over colored surfaces */
  outline?:   boolean;
  className?: string;
}

// ── Inline SVG icons (shown at Large + Medium only) ────────────
function IcoCheck() {
  return (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false"
      style={{ width: '100%', height: '100%' }}>
      <path d="M2 5l2.5 2.5L8 3" stroke="white"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoMinus() {
  return (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false"
      style={{ width: '100%', height: '100%' }}>
      <path d="M2.5 5h5" stroke="white"
        strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IcoClock() {
  return (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false"
      style={{ width: '100%', height: '100%' }}>
      <circle cx="5" cy="5" r="3.5" stroke="white" strokeWidth="1" />
      <path d="M5 3.25V5l1.25 1" stroke="white"
        strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoX() {
  return (
    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false"
      style={{ width: '100%', height: '100%' }}>
      <path d="M3 3l4 4M7 3l-4 4" stroke="rgba(0,9,51,0.45)"
        strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const TYPE_ICONS: Partial<Record<BadgeDotType, React.ComponentType>> = {
  Online:  IcoCheck,
  Busy:    IcoMinus,
  Away:    IcoClock,
  Offline: IcoX,
};

const TYPE_LABELS: Record<BadgeDotType, string> = {
  Online:       'En línea',
  Busy:         'Ocupado',
  Away:         'Ausente',
  Offline:      'Desconectado',
  Notification: 'Notificación',
};

export function BadgeDot({
  type      = 'Online',
  size      = 'Large',
  outline   = false,
  className,
}: BadgeDotProps) {
  const IconComp  = TYPE_ICONS[type];
  const showIcon  = Boolean(IconComp) && size !== 'Small';

  return (
    <span
      className={[
        styles['bdd-root'],
        styles[`bdd-type--${type.toLowerCase()}`],
        styles[`bdd-size--${size.toLowerCase()}`],
        outline ? styles['bdd--outline'] : '',
        className,
      ].filter(Boolean).join(' ')}
      role="status"
      aria-label={TYPE_LABELS[type]}
    >
      {showIcon && IconComp && (
        <span className={styles['bdd-icon']}>
          <IconComp />
        </span>
      )}
    </span>
  );
}

export default BadgeDot;
