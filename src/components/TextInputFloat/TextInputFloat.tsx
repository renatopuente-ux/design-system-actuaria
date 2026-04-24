import React, { useId } from 'react';
import styles from './TextInputFloat.module.css';

const XOctagonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles['tif-error-icon']}>
    <path
      d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export interface TextInputFloatProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
  className?: string;
}

export const TextInputFloat = React.forwardRef<HTMLInputElement, TextInputFloatProps>(
  (
    {
      value,
      onChange,
      label = 'Label',
      hint,
      error,
      required,
      optional,
      disabled = false,
      type = 'text',
      className = '',
    },
    ref,
  ) => {
    const id = useId();
    const hintId = `${id}-hint`;
    const errorId = `${id}-error`;

    const describedBy = [
      error ? errorId : null,
      hint && !error ? hintId : null,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={[styles['tif-root'], className].filter(Boolean).join(' ')}>
        {error && (
          <div className={styles['tif-error-block']} id={errorId} role="alert">
            <XOctagonIcon />
            <span className={styles['tif-error-text']}>{error}</span>
          </div>
        )}

        {/* input precedes label in DOM so CSS sibling selectors work */}
        <div
          className={[
            styles['tif-wrap'],
            error ? styles['tif-wrap--error'] : '',
            disabled ? styles['tif-wrap--disabled'] : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <input
            ref={ref}
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy || undefined}
            aria-label={label}
            placeholder=" "
            className={styles['tif-input']}
          />
          <label htmlFor={id} className={styles['tif-label']}>
            {label}
            {required && (
              <span className={styles['tif-required']} aria-hidden="true">
                {' '}*
              </span>
            )}
            {optional && !required && (
              <span className={styles['tif-optional']}> (opcional)</span>
            )}
          </label>
        </div>

        {hint && !error && (
          <span id={hintId} className={styles['tif-hint']}>
            {hint}
          </span>
        )}
      </div>
    );
  },
);

TextInputFloat.displayName = 'TextInputFloat';

export default TextInputFloat;
