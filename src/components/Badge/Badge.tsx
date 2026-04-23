/* ═══════════════════════════════════════════════════════════════
   Badge — Actuaria Design System
   Figma node: 3508:66832  ·  fileKey: N1wh3u4sX3UGyUU5oWOaz6
   ═══════════════════════════════════════════════════════════════ */
import React from 'react';
import styles from './Badge.module.css';

export type BadgeTone = 'Error' | 'Warning' | 'Success' | 'Information' | 'Neutral' | 'Brand';
export type BadgeSize = 'Medium' | 'Small';

export interface BadgeProps {
  tone?:      BadgeTone;
  size?:      BadgeSize;
  /** Show the tone icon */
  icon?:      boolean;
  /** Show a 12px green status dot */
  badgeDot?:  boolean;
  children:   React.ReactNode;
  className?: string;
}

const toneSlug = (t: BadgeTone) => t.toLowerCase();

// ── Inline SVG icons ───────────────────────────────────────────
function IcoError({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="0.8" fill="currentColor" />
    </svg>
  );
}

function IcoWarning({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <path d="M12 3L22 20H2L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.8" fill="currentColor" />
    </svg>
  );
}

function IcoSuccess({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12l3 3 5-6" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoInfo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 11v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="8" r="0.8" fill="currentColor" />
    </svg>
  );
}

function IcoDiamond({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <path d="M12 3l9 9-9 9-9-9 9-9Z" stroke="currentColor"
        strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const TONE_ICONS: Record<BadgeTone, React.ComponentType<{ size: number }>> = {
  Error:       IcoError,
  Warning:     IcoWarning,
  Success:     IcoSuccess,
  Information: IcoInfo,
  Neutral:     IcoDiamond,
  Brand:       IcoDiamond,
};

export function Badge({
  tone      = 'Neutral',
  size      = 'Medium',
  icon      = false,
  badgeDot  = false,
  children,
  className,
}: BadgeProps) {
  const iconPx   = size === 'Medium' ? 20 : 16;
  const IconComp = TONE_ICONS[tone];

  return (
    <span
      className={[
        styles['bdg-root'],
        styles[`bdg-tone--${toneSlug(tone)}`],
        styles[`bdg-size--${size.toLowerCase()}`],
        className,
      ].filter(Boolean).join(' ')}
    >
      {icon && (
        <span className={styles['bdg-icon']}>
          <IconComp size={iconPx} />
        </span>
      )}
      <span className={styles['bdg-label']}>{children}</span>
      {badgeDot && <span className={styles['bdg-dot']} aria-hidden="true" />}
    </span>
  );
}

export default Badge;
