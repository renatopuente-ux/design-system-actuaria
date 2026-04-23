/* ═══════════════════════════════════════════════════════════════
   Alert — Actuaria Design System
   Figma node: 3482:58557  ·  fileKey: N1wh3u4sX3UGyUU5oWOaz6
   ═══════════════════════════════════════════════════════════════ */
import React from 'react';
import styles from './Alert.module.css';

export type AlertTone =
  | 'Error' | 'Warning' | 'Success' | 'Information'
  | 'Neutral' | 'Brand' | 'Inverse neutral' | 'Inverse brand';

export type AlertSize   = 'Large' | 'Small';
export type AlertLayout = 'Horizontal' | 'Vertical';

export interface AlertProps {
  /** Semantic tone — drives colors, icon and accent bar */
  tone?:          AlertTone;
  /** Visual density — affects font size */
  size?:          AlertSize;
  /** Flow direction of icon vs text content */
  layout?:        AlertLayout;
  /** Bold heading line */
  heading?:       string;
  /** Body content / description */
  children?:      React.ReactNode;
  /** Show 4 px left accent bar (default true) */
  borderLeft?:    boolean;
  /** Show ✕ dismiss button (default true) */
  dismissible?:   boolean;
  /** Called on dismiss button click */
  onDismiss?:     () => void;
  /** Show semantic tone icon (default true) */
  icon?:          boolean;
  /** Wrap icon in a pill container */
  iconContainer?: boolean;
  /** Override the default tone icon */
  customIcon?:    React.ReactNode;
  /** Inline text link rendered below body */
  link?:          React.ReactNode;
  /** Action buttons rendered below body */
  buttonGroup?:   React.ReactNode;
  className?:     string;
}

// ── Inline SVG icons — no external deps ───────────────────────
function IcoError() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="0.8" fill="currentColor" />
    </svg>
  );
}

function IcoWarning() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <path d="M12 3.5L2.5 20.5h19L12 3.5z" stroke="currentColor"
        strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="17.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function IcoSuccess() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12l3 3 5-5" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoInfo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 16v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="8" r="0.8" fill="currentColor" />
    </svg>
  );
}

function IcoClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      aria-hidden="true" focusable="false">
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const TONE_ICONS: Record<AlertTone, React.FC> = {
  'Error':           IcoError,
  'Warning':         IcoWarning,
  'Success':         IcoSuccess,
  'Information':     IcoInfo,
  'Neutral':         IcoInfo,
  'Brand':           IcoInfo,
  'Inverse neutral': IcoInfo,
  'Inverse brand':   IcoInfo,
};

const TONE_ARIA: Record<AlertTone, string> = {
  'Error':           'Error',
  'Warning':         'Advertencia',
  'Success':         'Éxito',
  'Information':     'Información',
  'Neutral':         'Información',
  'Brand':           'Información',
  'Inverse neutral': 'Información',
  'Inverse brand':   'Información',
};

function toneSlug(tone: AlertTone) {
  return tone.toLowerCase().replace(' ', '-');
}

export function Alert({
  tone          = 'Error',
  size          = 'Large',
  layout        = 'Horizontal',
  heading,
  children,
  borderLeft    = true,
  dismissible   = true,
  onDismiss,
  icon          = true,
  iconContainer = false,
  customIcon,
  link,
  buttonGroup,
  className,
}: AlertProps) {
  const ToneIcon    = TONE_ICONS[tone];
  const isInverse   = tone === 'Inverse neutral' || tone === 'Inverse brand';
  const isSmall     = size === 'Small';
  const isVertical  = layout === 'Vertical';
  // Small+Vertical non-inverse: dismiss is positioned absolute at top-right
  const absDissmiss = isSmall && isVertical && !isInverse;

  // ── Resolved icon node ─────────────────────────────────────
  const iconNode = customIcon
    ? <span className={styles['al-icon']}>{customIcon}</span>
    : iconContainer
      ? <span className={styles['al-icon-wrap']}><ToneIcon /></span>
      : icon
        ? <span className={styles['al-icon']}><ToneIcon /></span>
        : null;

  return (
    <div
      className={[
        styles['al-root'],
        styles[`al-tone--${toneSlug(tone)}`],
        isSmall    ? styles['al-size--small']    : styles['al-size--large'],
        isVertical ? styles['al-layout--vertical'] : styles['al-layout--horizontal'],
        className,
      ].filter(Boolean).join(' ')}
      role="alert"
      aria-live="polite"
      aria-label={TONE_ARIA[tone]}
    >
      {/* 4 px left accent bar */}
      {borderLeft && (
        <div className={styles['al-bar']} aria-hidden="true" />
      )}

      {/* Absolute dismiss — only for small+vertical non-inverse */}
      {absDissmiss && dismissible && (
        <button
          className={`${styles['al-dismiss']} ${styles['al-dismiss--abs']}`}
          onClick={onDismiss}
          aria-label="Cerrar alerta"
          type="button"
        >
          <IcoClose />
        </button>
      )}

      {/* Main content */}
      <div className={[
        styles['al-content'],
        absDissmiss ? styles['al-content--col'] : '',
      ].filter(Boolean).join(' ')}>

        {iconNode}

        {/* Text stack */}
        <div className={[
          styles['al-text'],
          isSmall ? styles['al-text--small'] : '',
        ].filter(Boolean).join(' ')}>
          {heading  && <p className={styles['al-heading']}>{heading}</p>}
          {children && <div className={styles['al-body']}>{children}</div>}
          {link     && <div className={styles['al-link']}>{link}</div>}
          {buttonGroup && <div className={styles['al-actions']}>{buttonGroup}</div>}
        </div>

        {/* Inline dismiss (all non-abs layouts) */}
        {!absDissmiss && dismissible && (
          <button
            className={styles['al-dismiss']}
            onClick={onDismiss}
            aria-label="Cerrar alerta"
            type="button"
          >
            <IcoClose />
          </button>
        )}
      </div>
    </div>
  );
}

export default Alert;
