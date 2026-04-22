import React, { useId } from 'react';
import styles from './TextArea.module.css';

export interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
}

/**
 * TextArea — multi-line text field with optional character counter.
 * Vertical-only resize prevents layout breakage in narrow form columns.
 * Character counter becomes visually prominent near the limit (>90% consumed).
 */
export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  label,
  error,
  hint,
  disabled = false,
  rows = 4,
  maxLength,
}) => {
  const generatedId = useId();
  const textareaId = generatedId;
  const hintId = `${textareaId}-hint`;
  const errorId = `${textareaId}-error`;
  const countId = `${textareaId}-count`;

  const remaining = maxLength !== undefined ? maxLength - value.length : null;
  const isNearLimit = remaining !== null && remaining <= Math.ceil((maxLength ?? 0) * 0.1);

  const describedBy = [
    error ? errorId : null,
    hint && !error ? hintId : null,
    maxLength ? countId : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles['ta-root']}>
      {label && (
        <label htmlFor={textareaId} className={styles['ta-label']}>
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        className={[
          styles['ta-textarea'],
          error ? styles['ta-textarea--error'] : '',
          disabled ? styles['ta-textarea--disabled'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />

      <div className={styles['ta-footer']}>
        <span>
          {hint && !error && (
            <span id={hintId} className={styles['ta-hint']}>
              {hint}
            </span>
          )}
          {error && (
            <span id={errorId} className={styles['ta-error']} role="alert">
              {error}
            </span>
          )}
        </span>

        {maxLength !== undefined && (
          <span
            id={countId}
            className={[
              styles['ta-counter'],
              isNearLimit ? styles['ta-counter--near-limit'] : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-live="polite"
          >
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};
