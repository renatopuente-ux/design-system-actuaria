/* ═══════════════════════════════════════════════════════════════
   BadgeCount — Actuaria Design System
   Figma node: 3639:1148  ·  fileKey: N1wh3u4sX3UGyUU5oWOaz6
   ═══════════════════════════════════════════════════════════════ */
import React from 'react';
import styles from './BadgeCount.module.css';

export type BadgeCountEmphasis = 'Strong' | 'Moderate' | 'Weak';

export interface BadgeCountProps {
  /** Numeric count to display */
  count:       number;
  /** Numbers above max render as "{max}+" — defaults to 99 */
  max?:        number;
  /** Visual weight: Strong = solid red, Moderate = tinted, Weak = neutral */
  emphasis?:   BadgeCountEmphasis;
  className?:  string;
}

export function BadgeCount({
  count,
  max       = 99,
  emphasis  = 'Strong',
  className,
}: BadgeCountProps) {
  const display = count > max ? `${max}+` : String(count);

  return (
    <span
      className={[
        styles['bc-root'],
        styles[`bc-emphasis--${emphasis.toLowerCase()}`],
        className,
      ].filter(Boolean).join(' ')}
      aria-label={`${count} notificaciones`}
      role="status"
    >
      {display}
    </span>
  );
}

export default BadgeCount;
