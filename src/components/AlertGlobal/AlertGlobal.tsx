/* ═══════════════════════════════════════════════════════════════
   AlertGlobal — Actuaria Design System
   Figma node: 5801:57029  ·  fileKey: N1wh3u4sX3UGyUU5oWOaz6
   ═══════════════════════════════════════════════════════════════ */
import React from 'react';
import styles from './AlertGlobal.module.css';

export type AlertGlobalTone =
  | 'Error' | 'Warning' | 'Success' | 'Information'
  | 'Neutral' | 'Brand' | 'Inverse neutral' | 'Inverse brand';

export type AlertGlobalDevice = 'Desktop' | 'Mobile';

export interface AlertGlobalProps {
  tone?:        AlertGlobalTone;
  device?:      AlertGlobalDevice;
  /** Banner message text */
  children:     React.ReactNode;
  /** Show semantic tone icon (default true) */
  icon?:        boolean;
  /** Override the default tone icon */
  customIcon?:  React.ReactNode;
  /** Show ✕ dismiss button (default true) */
  dismissible?: boolean;
  /** Called on dismiss button click */
  onDismiss?:   () => void;
  /** Action button(s) rendered inline */
  buttonGroup?: React.ReactNode;
  className?:   string;
}

// ── Inline SVG icons ───────────────────────────────────────
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

function IcoDiamond() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <rect x="12" y="3.5" width="11.5" height="11.5" rx="1"
        transform="rotate(45 12 3.5)"
        stroke="currentColor" strokeWidth="1.5" />
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

const TONE_ICONS: Record<AlertGlobalTone, React.FC> = {
  'Error':           IcoError,
  'Warning':         IcoWarning,
  'Success':         IcoSuccess,
  'Information':     IcoInfo,
  'Neutral':         IcoDiamond,
  'Brand':           IcoDiamond,
  'Inverse neutral': IcoDiamond,
  'Inverse brand':   IcoDiamond,
};

function toneSlug(tone: AlertGlobalTone) {
  return tone.toLowerCase().replace(' ', '-');
}

export function AlertGlobal({
  tone        = 'Error',
  device      = 'Desktop',
  children,
  icon        = true,
  customIcon,
  dismissible = true,
  onDismiss,
  buttonGroup,
  className,
}: AlertGlobalProps) {
  const ToneIcon  = TONE_ICONS[tone];
  const isInverse = tone === 'Inverse neutral' || tone === 'Inverse brand';
  const isMobile  = device === 'Mobile';

  const iconNode = customIcon
    ? <span className={styles['ag-icon']}>{customIcon}</span>
    : icon
      ? <span className={styles['ag-icon']}><ToneIcon /></span>
      : null;

  const dismissBtn = dismissible ? (
    <button
      className={[
        styles['ag-dismiss'],
        isMobile ? styles['ag-dismiss--abs'] : '',
      ].filter(Boolean).join(' ')}
      onClick={onDismiss}
      aria-label="Cerrar notificación"
      type="button"
    >
      <IcoClose />
    </button>
  ) : null;

  return (
    <div
      className={[
        styles['ag-root'],
        styles[`ag-tone--${toneSlug(tone)}`],
        styles[`ag-device--${device.toLowerCase()}`],
        className,
      ].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Mobile: icon is outside the content column */}
      {isMobile && iconNode}

      {/* Content: desktop = single row, mobile = stacked column */}
      <div className={[
        styles['ag-content'],
        isMobile ? styles['ag-content--mobile'] : '',
      ].filter(Boolean).join(' ')}>

        {/* Desktop: icon lives inside content */}
        {!isMobile && iconNode}

        <p className={[
          styles['ag-message'],
          isInverse ? styles['ag-message--inverse'] : '',
        ].filter(Boolean).join(' ')}>
          {children}
        </p>

        {/* Mobile: button group stacked below message */}
        {isMobile && buttonGroup && (
          <div className={styles['ag-button-group']}>{buttonGroup}</div>
        )}
      </div>

      {/* Desktop: button group inline */}
      {!isMobile && buttonGroup && (
        <div className={styles['ag-button-group']}>{buttonGroup}</div>
      )}

      {/* Desktop dismiss inline; mobile dismiss is absolute */}
      {dismissBtn}
    </div>
  );
}

export default AlertGlobal;
