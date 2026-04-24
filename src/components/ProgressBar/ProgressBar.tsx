import React, { useId } from 'react';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = true,
  color,
  size = 'md',
  orientation = 'horizontal',
  className = '',
}) => {
  const id = useId();
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const isVertical = orientation === 'vertical';

  return (
    <div
      className={[
        styles.pb,
        isVertical ? styles['pb--vertical'] : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {!isVertical && (label || showValue) && (
        <div className={styles.pb__header}>
          {label && (
            <label htmlFor={id} className={styles.pb__label}>
              {label}
            </label>
          )}
          {showValue && (
            <span className={styles.pb__value} aria-live="polite">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        id={id}
        className={[
          styles.pb__track,
          isVertical ? styles['pb__track--vertical'] : styles[`pb__track--${size}`],
        ].join(' ')}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        aria-orientation={isVertical ? 'vertical' : undefined}
      >
        <div
          className={[
            styles.pb__fill,
            isVertical ? styles['pb__fill--vertical'] : '',
          ].filter(Boolean).join(' ')}
          style={
            isVertical
              ? { height: `${pct}%`, backgroundColor: color ?? undefined }
              : { width: `${pct}%`, backgroundColor: color ?? 'var(--interactive-action, #4c64d9)' }
          }
        />
      </div>
    </div>
  );
};

export default ProgressBar;
