import React, { useId } from 'react';
import styles from './Stepper.module.css';

const MinusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const XOctagonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2Z" stroke="#c73a3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8v4M12 16h.01" stroke="#c73a3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  valid?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  label,
  required = false,
  optional = false,
  hint,
  valid = true,
  errorMessage,
  disabled = false,
  className = '',
}) => {
  const id = useId();
  const errorId = `${id}-error`;
  const hasError = !valid;

  const handleDecrement = () => {
    if (disabled) return;
    onChange(Math.max(min, value - step));
  };

  const handleIncrement = () => {
    if (disabled) return;
    onChange(Math.min(max === Infinity ? value + step : max, value + step));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num)) onChange(Math.min(max === Infinity ? num : max, Math.max(min, num)));
  };

  return (
    <div
      className={[
        styles['stp-root'],
        disabled ? styles['stp-root--disabled'] : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {label && (
        <div className={styles['stp-text']}>
          <div className={styles['stp-label-row']}>
            <label htmlFor={id} className={styles['stp-label']}>
              {label}
            </label>
            {required && <span className={styles['stp-required']}> *</span>}
            {optional && <span className={styles['stp-optional']}> (opcional)</span>}
          </div>
          {hint && <p className={styles['stp-hint']}>{hint}</p>}
        </div>
      )}

      {hasError && !disabled && (
        <div id={errorId} className={styles['stp-error']} role="alert">
          <XOctagonIcon />
          <span className={styles['stp-error-text']}>{errorMessage ?? 'Error message'}</span>
        </div>
      )}

      <div
        className={[
          styles['stp-field'],
          hasError && !disabled ? styles['stp-field--error'] : '',
          disabled ? styles['stp-field--disabled'] : '',
        ].filter(Boolean).join(' ')}
        aria-describedby={hasError && !disabled ? errorId : undefined}
      >
        <button
          type="button"
          className={[styles['stp-btn'], styles['stp-btn--minus']].join(' ')}
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          aria-label="Decrementar"
        >
          <MinusIcon />
        </button>

        <input
          id={id}
          type="number"
          className={styles['stp-input']}
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max === Infinity ? undefined : max}
          step={step}
          disabled={disabled}
          aria-invalid={hasError}
        />

        <button
          type="button"
          className={[styles['stp-btn'], styles['stp-btn--plus']].join(' ')}
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          aria-label="Incrementar"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default Stepper;
