import React, { useId } from 'react';
import styles from './Slider.module.css';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
}

/**
 * Slider — range input with custom track fill.
 * The left portion of the track fills with --interactive-action
 * using a CSS linear-gradient trick driven by the --fill-pct custom property.
 * This avoids JS-driven DOM manipulation while keeping precise fill alignment.
 *
 * In actuarial simulators this is used for:
 *   - discount rate (0%–20%)
 *   - projection horizon (1–40 years)
 *   - mortality adjustment factor (80%–120%)
 */
export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
}) => {
  const id = useId();
  const labelId = `${id}-label`;
  const valueId = `${id}-value`;

  // Percentage for CSS gradient fill — clamped to [0,100]
  const fillPct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div className={styles['sr-root']}>
      <div className={styles['sr-header']}>
        {label && (
          <label id={labelId} htmlFor={id} className={styles['sr-label']}>
            {label}
          </label>
        )}
        {showValue && (
          <span id={valueId} className={styles['sr-value']} aria-live="polite">
            {value}
          </span>
        )}
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-labelledby={label ? labelId : undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={showValue ? String(value) : undefined}
        style={{ '--sr-fill-pct': `${fillPct}%` } as React.CSSProperties}
        className={styles['sr-input']}
      />

      <div className={styles['sr-bounds']} aria-hidden="true">
        <span className={styles['sr-bound']}>{min}</span>
        <span className={styles['sr-bound']}>{max}</span>
      </div>
    </div>
  );
};
