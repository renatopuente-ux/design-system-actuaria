import React, { useId } from 'react';
import styles from './TextArea.module.css';

const XOctagonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles['ta-error-icon']}>
    <path
      d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      maxLength,
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
      <div className={[styles['ta-root'], className].filter(Boolean).join(' ')}>
        {label && (
          <div className={styles['ta-label-block']}>
            <label
              htmlFor={id}
              className={[
                styles['ta-label'],
                disabled ? styles['ta-label--disabled'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {label}
              {required && (
                <span className={styles['ta-required']} aria-hidden="true">
                  {' '}*
                </span>
              )}
              {optional && !required && (
                <span className={styles['ta-optional']}> (opcional)</span>
              )}
            </label>
            {hint && (
              <span id={hintId} className={styles['ta-hint']}>
                {hint}
              </span>
            )}
          </div>
        )}

        {error && (
          <div className={styles['ta-error-block']} id={errorId} role="alert">
            <XOctagonIcon />
            <span className={styles['ta-error-text']}>{error}</span>
          </div>
        )}

        <textarea
          ref={ref}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          className={[
            styles['ta-field'],
            error ? styles['ta-field--error'] : '',
            disabled ? styles['ta-field--disabled'] : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
