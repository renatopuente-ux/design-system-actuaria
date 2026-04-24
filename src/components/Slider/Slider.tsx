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
  valueFormatter?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
  valueFormatter,
  disabled = false,
  className = '',
}) => {
  const id = useId();
  const labelId = `${id}-label`;

  const fillPct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const displayValue = valueFormatter ? valueFormatter(value) : String(value);

  return (
    <div className={[styles['sl-root'], disabled ? styles['sl-root--disabled'] : '', className].filter(Boolean).join(' ')}>
      {(label || showValue) && (
        <div className={styles['sl-header']}>
          {label && (
            <label id={labelId} htmlFor={id} className={styles['sl-label']}>
              {label}
            </label>
          )}
          {showValue && (
            <span className={styles['sl-value']} aria-live="polite">
              {displayValue}
            </span>
          )}
        </div>
      )}

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-labelledby={label ? labelId : undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{ '--sl-fill-pct': `${fillPct}%` } as React.CSSProperties}
        className={styles['sl-input']}
      />
    </div>
  );
};

export default Slider;
