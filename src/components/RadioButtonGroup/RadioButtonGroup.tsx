import React, { useId } from 'react';
import { RadioButton, RadioButtonSize } from '../RadioButton/RadioButton';
import styles from './RadioButtonGroup.module.css';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioButtonGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  label?: string;
  size?: RadioButtonSize;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  valid?: boolean;
  errorMessage?: string;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

const XOctagonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" flexShrink={0} style={{ flexShrink: 0 }}>
    <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2Z" stroke="#c73a3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8v4M12 16h.01" stroke="#c73a3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  size = 'Large',
  required = false,
  optional = false,
  hint,
  valid = true,
  errorMessage = 'Error message',
  orientation = 'vertical',
  className,
}) => {
  const groupId = useId();
  const groupName = name ?? groupId;

  return (
    <fieldset className={[styles['rbg'], className].filter(Boolean).join(' ')}>
      {/* Label row */}
      {label && (
        <div className={styles['rbg__legend-row']}>
          <legend className={styles['rbg__legend']}>
            <span>{label}</span>
            {required && <span className={styles['rbg__required']}> *</span>}
            {optional && <span className={styles['rbg__optional']}> (opcional)</span>}
          </legend>
        </div>
      )}

      {/* Hint */}
      {hint && <p className={styles['rbg__hint']}>{hint}</p>}

      {/* Error block */}
      {!valid && (
        <div className={styles['rbg__error']}>
          <XOctagonIcon />
          <span className={styles['rbg__error-text']}>{errorMessage}</span>
        </div>
      )}

      {/* Radio list */}
      <div
        className={[
          styles['rbg__list'],
          styles[`rbg__list--${orientation}`],
        ].join(' ')}
        role="radiogroup"
      >
        {options.map((option) => (
          <RadioButton
            key={option.value}
            label={option.label}
            value={option.value}
            name={groupName}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={onChange}
            size={size}
            valid={valid}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default RadioButtonGroup;
