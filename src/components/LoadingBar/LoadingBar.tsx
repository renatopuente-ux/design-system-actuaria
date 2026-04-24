import React from 'react';
import styles from './LoadingBar.module.css';

export interface LoadingBarProps {
  /** 0–100 */
  progress?: number;
  /** Infinite animated bar */
  indeterminate?: boolean;
  /** Show percentage label to the right */
  showLabel?: boolean;
  /** Override fill color */
  color?: string;
  /** Height in px. Default 8 (Figma spec) */
  height?: number;
  className?: string;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
  progress = 0,
  indeterminate = false,
  showLabel = false,
  color,
  height = 8,
  className,
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className={[styles['lb-root'], className].filter(Boolean).join(' ')}>
      <div
        className={styles['lb-track']}
        style={{ height }}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso"
        aria-busy={indeterminate}
      >
        {indeterminate ? (
          <span
            className={styles['lb-bar--indeterminate']}
            style={color ? { backgroundColor: color } : undefined}
          />
        ) : (
          <span
            className={styles['lb-bar--determinate']}
            style={{
              width: `${clamped}%`,
              ...(color ? { backgroundColor: color } : {}),
            }}
          />
        )}
      </div>
      {showLabel && !indeterminate && (
        <span className={styles['lb-label']} aria-hidden="true">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
};
