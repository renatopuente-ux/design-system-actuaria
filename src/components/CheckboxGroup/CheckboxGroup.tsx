import React from 'react';
import styles from './CheckboxGroup.module.css';

export interface CheckboxGroupProps {
  legend: string;
  hint?: string;
  optional?: boolean;
  required?: boolean;
  size?: 'Small' | 'Large';
  valid?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * CheckboxGroup — Figma spec 3449:65755.
 * Wraps Checkbox items in a <fieldset> + <legend> for accessibility.
 * Supports hint text, optional/required suffix, and error state.
 * Sizes: Large (legend 16px, gap 8px) / Small (legend 14px, gap 4px).
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  legend,
  hint,
  optional = false,
  required = false,
  size = 'Large',
  valid = true,
  errorMessage,
  children,
  className,
}) => {
  const isSmall = size === 'Small';

  const fieldsetClasses = [
    styles['cg-fieldset'],
    isSmall ? styles['cg-fieldset--small'] : styles['cg-fieldset--large'],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const checkboxesClasses = [
    styles['cg-checkboxes'],
    isSmall ? styles['cg-checkboxes--small'] : styles['cg-checkboxes--large'],
  ]
    .filter(Boolean)
    .join(' ');

  const legendClasses = [
    styles['cg-legend'],
    isSmall ? styles['cg-legend--small'] : styles['cg-legend--large'],
  ]
    .filter(Boolean)
    .join(' ');

  const showError = !valid && !!errorMessage;

  return (
    <fieldset className={fieldsetClasses}>
      {/* Legend row: group label + optional/required suffix */}
      <legend className={legendClasses}>
        <span className={styles['cg-legend-text']}>{legend}</span>
        {optional && (
          <span className={styles['cg-legend-suffix']}> (Opcional)</span>
        )}
        {required && !optional && (
          <span className={styles['cg-legend-suffix']}> (Requerido)</span>
        )}
      </legend>

      {/* Checkbox items */}
      <div className={checkboxesClasses}>
        {children}
      </div>

      {/* Hint text */}
      {hint && !showError && (
        <p className={styles['cg-hint']}>{hint}</p>
      )}

      {/* Error message */}
      {showError && (
        <p className={styles['cg-error']}>
          {/* Octagon-X icon */}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            width="16"
            height="16"
            aria-hidden="true"
            className={styles['cg-error-icon']}
          >
            <path
              d="M5.6 1h4.8L15 5.6v4.8L10.4 15H5.6L1 10.4V5.6L5.6 1z"
              fill="#c73a3a"
            />
            <path
              d="M5.5 5.5l5 5M10.5 5.5l-5 5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>{errorMessage}</span>
        </p>
      )}
    </fieldset>
  );
};
