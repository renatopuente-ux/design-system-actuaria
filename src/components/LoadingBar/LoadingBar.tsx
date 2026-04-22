import React from 'react';
import styles from './LoadingBar.module.css';

export interface LoadingBarProps {
  /** 0–100. Used when indeterminate is false */
  progress?: number;
  /** If true, renders an infinite animated bar */
  indeterminate?: boolean;
  /** Override the bar fill color via CSS custom property value */
  color?: string;
  /** Height of the bar in pixels. Default 4 */
  height?: number;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
  progress = 0,
  indeterminate = false,
  color,
  height = 4,
}) => {
  // Clamp progress to valid 0-100 range
  const clamped = Math.min(100, Math.max(0, progress));

  return (
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
  );
};
