import React, { useId } from 'react';
import styles from './TextInput.module.css';

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
}

/**
 * TextInput — single-line text field for actuarial data entry.
 * Error state communicates validation failures (e.g. invalid premium rate).
 * Uses useId() for SSR-safe label association.
 */
export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  error,
  hint,
  disabled = false,
  required = false,
  id,
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles['ti-root']}>
      {label && (
        <label
          htmlFor={inputId}
          className={styles['ti-label']}
        >
          {label}
          {required && (
            <span className={styles['ti-required']} aria-hidden="true">
              {' '}*
            </span>
          )}
        </label>
      )}

      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        className={[
          styles['ti-input'],
          error ? styles['ti-input--error'] : '',
          disabled ? styles['ti-input--disabled'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />

      {hint && !error && (
        <span id={hintId} className={styles['ti-hint']}>
          {hint}
        </span>
      )}

      {error && (
        <span id={errorId} className={styles['ti-error']} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
