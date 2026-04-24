import React, { useId, useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'Large' | 'Small';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: CheckboxSize;
  valid?: boolean;
}

/**
 * Checkbox — Figma spec 3449:65713.
 * Sizes: Large 32×32px / Small 24×24px.
 * States: Default | Hover | Pressed | Focused | Disabled.
 * Types: Unselected | Selected | Indeterminate.
 * Valid prop controls error styling (border + bg when false).
 *
 * Indeterminate is set via DOM ref because it is a property,
 * not an HTML attribute.
 * Native input is sr-only; custom .cb-box is aria-hidden.
 * Focus ring is applied via :focus-visible on the native input,
 * positioned to overlay the .cb-wrap element.
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
  size = 'Large',
  valid = true,
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
  const isSmall = size === 'Small';

  const rootClasses = [
    styles['cb-root'],
    isSmall ? styles['cb-root--small'] : styles['cb-root--large'],
    disabled ? styles['cb-root--disabled'] : '',
    !valid && !disabled ? styles['cb-root--invalid'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const wrapClasses = [
    styles['cb-wrap'],
    isSmall ? styles['cb-wrap--small'] : styles['cb-wrap--large'],
  ]
    .filter(Boolean)
    .join(' ');

  const boxClasses = [
    styles['cb-box'],
    isSmall ? styles['cb-box--small'] : styles['cb-box--large'],
    isActive ? styles['cb-box--active'] : '',
    disabled ? styles['cb-box--disabled'] : '',
    !valid && !disabled ? styles['cb-box--invalid'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = [
    styles['cb-label'],
    isSmall ? styles['cb-label--small'] : styles['cb-label--large'],
    disabled ? styles['cb-label--disabled'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label
      htmlFor={id}
      className={rootClasses}
    >
      {/* .cb-wrap provides the hover/pressed ring around the box */}
      <span className={wrapClasses}>
        {/* Native checkbox: visually hidden, keyboard and AT accessible */}
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

        {/* Custom visual box — aria-hidden, purely decorative */}
        <span className={boxClasses} aria-hidden="true">
          {indeterminate && !checked && (
            // Dash mark for indeterminate state
            isSmall ? (
              <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                <rect x="0" y="0" width="10" height="2" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                <rect x="0" y="0" width="14" height="2" rx="1" fill="currentColor" />
              </svg>
            )
          )}
          {checked && (
            // Checkmark SVG — white, centered in box
            isSmall ? (
              <svg width="12" height="9" viewBox="0 0 14 11" fill="none">
                <path
                  d="M1.5 6L5.5 10L12.5 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path
                  d="M1.5 6L5.5 10L12.5 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )
          )}
        </span>
      </span>

      {label && (
        <span className={labelClasses}>{label}</span>
      )}
    </label>
  );
};
