/* ═══════════════════════════════════════════════════════════════
   ProductCard — Actuaria Design System
   Figma nodes: 9018:23233 (Large 432px), 9018:24272 (Small 364px)
   ═══════════════════════════════════════════════════════════════ */
import React, { useState } from 'react';
import styles from './ProductCard.module.css';

export type ProductCardSize = 'Large' | 'Small';
export type ProductCardBadgeTone = 'success' | 'warning';

export interface ProductCardBadge {
  label: string;
  tone: ProductCardBadgeTone;
}

export interface ProductCardProps {
  /** 'Large' = 432px wide, 'Small' = 364px wide. Both 362px tall. */
  size?: ProductCardSize;
  /** Module icon element (SVG, 24×24 viewBox). Rendered at 48×48px. */
  icon: React.ReactNode;
  /** Show AI sparkle badge overlaid on top-right of icon (ActuarIA module). */
  aiBadge?: boolean;
  /** Use lavender background #efeff6 on front face (ActuarIA module). */
  isAI?: boolean;
  /** Module title. */
  heading: string;
  /** Short module description. */
  body: string;
  /** Status badge. tone 'success' → green "Contratado", 'warning' → amber "Disponible". */
  badge?: ProductCardBadge;
  /** Detail link text. Defaults to 'Conocer más' (Large) or 'Ver más' (Small). */
  linkText?: string;
  /** Called when the detail link is clicked (card also flips to back). */
  onLink?: () => void;
  /** Called when the "Ingresar" button is clicked. */
  onEnter?: () => void;
  /** Text paragraph shown on the back face (below the video area). */
  backContent?: string;
  className?: string;
}

// ── Internal icons ─────────────────────────────────────────────

const ArrowRightIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
    <path d="M4 10h12M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SoundIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" width="14" height="14" aria-hidden="true">
    <path d="M1 5.5h2L7 2.5v9L3 8.5H1V5.5z" fill="white" />
    <path d="M9 4.5c1 .7 1.5 1.4 1.5 2.5S10 9.3 9 10" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M11 3c1.5 1.1 2.5 2.3 2.5 4S12.5 10.9 11 12" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const MuteIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" width="14" height="14" aria-hidden="true">
    <path d="M1 5.5h2L7 2.5v9L3 8.5H1V5.5z" fill="white" />
    <path d="M9 5l4 4M13 5l-4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const FullscreenIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" width="32" height="32" aria-hidden="true">
    <path d="M20 5h5a2 2 0 0 1 2 2v5M27 20v5a2 2 0 0 1-2 2h-5M12 27H7a2 2 0 0 1-2-2v-5M5 12V7a2 2 0 0 1 2-2h5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BackArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">
    <path d="M10 13L5 8l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AISparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24" aria-hidden="true">
    <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z" fill="var(--fill-brand-strong, #151f47)" strokeLinejoin="round" />
    <circle cx="5.5" cy="5.5" r="2" fill="var(--fill-brand-strong, #151f47)" />
  </svg>
);

// ── ProductCard ────────────────────────────────────────────────

export function ProductCard({
  size = 'Large',
  icon,
  aiBadge = false,
  isAI = false,
  heading,
  body,
  badge,
  linkText,
  onLink,
  onEnter,
  backContent,
  className,
}: ProductCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [muted, setMuted] = useState(false);

  const isLarge = size === 'Large';
  const resolvedLinkText = linkText ?? (isLarge ? 'Conocer más' : 'Ver más');

  function handleLinkClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setFlipped(true);
    onLink?.();
  }

  return (
    <div
      className={[
        styles['pc-root'],
        styles[`pc-root--${size.toLowerCase()}`],
        flipped ? styles['pc-root--flipped'] : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className={styles['pc-inner']}>

        {/* ── Front face ─────────────────────────────────── */}
        <div className={[
          styles['pc-face'],
          styles['pc-face--front'],
          isAI ? styles['pc-face--ai'] : '',
        ].filter(Boolean).join(' ')}>

          <div className={styles['pc-content']}>

            {/* Icon row */}
            <div className={styles['pc-icon-row']}>
              <div className={styles['pc-icon']} aria-hidden="true">
                {icon}
              </div>
              {aiBadge && (
                <div className={styles['pc-ai-badge']} aria-hidden="true">
                  <AISparkleIcon />
                </div>
              )}
              <button
                className={styles['pc-link']}
                onClick={handleLinkClick}
                type="button"
                aria-label={`${resolvedLinkText}: ${heading}`}
              >
                <span className={[
                  styles['pc-link-text'],
                  isLarge ? styles['pc-link-text--large'] : styles['pc-link-text--small'],
                ].join(' ')}>
                  {resolvedLinkText}
                </span>
                <ArrowRightIcon />
              </button>
            </div>

            {/* Text group */}
            <div className={styles['pc-text']}>
              <h3 className={styles['pc-heading']}>{heading}</h3>
              <p className={styles['pc-body']}>{body}</p>
            </div>

            {/* Badge */}
            {badge && (
              <div className={[
                styles['pc-badge'],
                styles[`pc-badge--${badge.tone}`],
              ].join(' ')}>
                <span className={[
                  styles['pc-badge-label'],
                  styles[`pc-badge-label--${badge.tone}`],
                ].join(' ')}>
                  {badge.label}
                </span>
              </div>
            )}

            {/* Ingresar button */}
            <button
              className={styles['pc-enter-btn']}
              onClick={(e) => { e.stopPropagation(); onEnter?.(); }}
              type="button"
            >
              Ingresar
            </button>
          </div>
        </div>

        {/* ── Back face ──────────────────────────────────── */}
        <div className={[styles['pc-face'], styles['pc-face--back']].join(' ')}>

          {/* Video placeholder area */}
          <div className={styles['pc-video']}>
            <div className={styles['pc-video-bg']} />
            <button
              className={styles['pc-video-mute']}
              onClick={() => setMuted(m => !m)}
              aria-label={muted ? 'Activar sonido' : 'Silenciar'}
              type="button"
            >
              {muted ? <MuteIcon /> : <SoundIcon />}
            </button>
            <button
              className={styles['pc-video-fullscreen']}
              aria-label="Pantalla completa"
              type="button"
            >
              <FullscreenIcon />
            </button>
          </div>

          {/* Back body */}
          <div className={styles['pc-back-body']}>
            {backContent && (
              <p className={styles['pc-back-text']}>{backContent}</p>
            )}
            <button
              className={styles['pc-back-btn']}
              onClick={() => setFlipped(false)}
              type="button"
            >
              <BackArrowIcon />
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
