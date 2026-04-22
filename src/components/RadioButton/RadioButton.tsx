import React, { useId } from 'react';
import styles from './RadioButton.module.css';

export interface RadioButtonProps {
  label: string;
  value: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  name,
  checked = false,
  disabled = false,
  onChange,
}) => {
  const id = useId();

  return (
    <label
      className={[
        styles.rb,
        checked ? styles['rb--checked'] : '',
        disabled ? styles['rb--disabled'] : '',
      ]
        .filter(Boolean)
        .join(' ')}
      htmlFor={id}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange?.(value)}
        className={styles.rb__input}
      />
      <span className={styles.rb__circle} aria-hidden="true">
        {checked && <span className={styles.rb__dot} />}
      </span>
      <span className={styles.rb__label}>{label}</span>
    </label>
  );
};

export default RadioButton;
