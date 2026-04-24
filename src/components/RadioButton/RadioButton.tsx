import React, { useId } from 'react';
import styles from './RadioButton.module.css';

export type RadioButtonSize = 'Large' | 'Small';
export type RadioButtonState = 'Default' | 'Hover' | 'Press' | 'Focus' | 'Disabled';

export interface RadioButtonProps {
  label: string;
  value: string;
  name?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  size?: RadioButtonSize;
  state?: RadioButtonState;
  valid?: boolean;
  /** @deprecated use state='Disabled' */
  disabled?: boolean;
  className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  name,
  checked = false,
  onChange,
  size = 'Large',
  state = 'Default',
  valid = true,
  disabled,
  className,
}) => {
  const id = useId();
  const isDisabled = disabled || state === 'Disabled';

  return (
    <label
      htmlFor={id}
      className={[
        styles['rb'],
        styles[`rb--${size.toLowerCase()}`],
        !valid ? styles['rb--invalid'] : '',
        isDisabled ? styles['rb--disabled'] : '',
        styles[`rb--${state.toLowerCase()}`],
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className={styles['rb__indicator']}>
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => !isDisabled && onChange?.(value)}
          disabled={isDisabled}
          className={styles['rb__input']}
        />
        <span className={[styles['rb__circle'], checked ? styles['rb__circle--checked'] : ''].filter(Boolean).join(' ')} aria-hidden="true">
          {checked && <span className={styles['rb__dot']} />}
        </span>
      </span>
      <span className={styles['rb__label']}>{label}</span>
    </label>
  );
};

export default RadioButton;
