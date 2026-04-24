import React, { useId } from 'react';
import styles from './TextInput.module.css';

const XOctagonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles['ti-error-icon']}>
    <path
      d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'search' | 'url';
  className?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      label,
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
      <div className={[styles['ti-root'], className].filter(Boolean).join(' ')}>
        {label && (
          <div className={styles['ti-label-block']}>
            <label
              htmlFor={id}
              className={[
                styles['ti-label'],
                disabled ? styles['ti-label--disabled'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {label}
              {required && (
                <span className={styles['ti-required']} aria-hidden="true">
                  {' '}*
                </span>
              )}
              {optional && !required && (
                <span className={styles['ti-optional']}> (opcional)</span>
              )}
            </label>
            {hint && (
              <span id={hintId} className={styles['ti-hint']}>
                {hint}
              </span>
            )}
          </div>
        )}

        {error && (
          <div className={styles['ti-error-block']} id={errorId} role="alert">
            <XOctagonIcon />
            <span className={styles['ti-error-text']}>{error}</span>
          </div>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          className={[
            styles['ti-field'],
            error ? styles['ti-field--error'] : '',
            disabled ? styles['ti-field--disabled'] : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
