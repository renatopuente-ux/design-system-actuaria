import React, { useId, useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

/**
 * Checkbox — custom 16×16px control with three visual states.
 * Indeterminate state is set via the DOM ref (not an HTML attribute)
 * because `indeterminate` is a property, not an attribute.
 * Checked: --interactive-action fill + white SVG checkmark.
 * Indeterminate: --interactive-action fill + white dash.
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
}) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  // indeterminate is a DOM property, not an HTML attribute — must be set via ref
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isActive = checked || indeterminate;

  return (
    <label
      htmlFor={id}
      className={[
        styles['cb-root'],
        disabled ? styles['cb-root--disabled'] : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Native checkbox is visually hidden but remains keyboard/AT accessible */}
      <input
        ref={inputRef}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : checked}
        className={styles['cb-native']}
      />

      {/* Custom visual control */}
      <span
        className={[
          styles['cb-box'],
          isActive ? styles['cb-box--active'] : '',
          disabled ? styles['cb-box--disabled'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      >
        {indeterminate && !checked && (
          /* Dash mark for indeterminate (e.g. partial selection of child rows) */
          <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
            <rect x="0" y="0" width="10" height="2" rx="1" fill="currentColor" />
          </svg>
        )}
        {checked && (
          /* Checkmark SVG — white, centered in 16px box */
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      {label && (
        <span className={styles['cb-label']}>{label}</span>
      )}
    </label>
  );
};
