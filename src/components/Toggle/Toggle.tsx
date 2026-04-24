import React, { useId } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'Medium' | 'Small';
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  size = 'Medium',
  disabled = false,
  id,
  className = '',
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={[
        styles['tog-root'],
        styles[`tog-root--${size === 'Medium' ? 'medium' : 'small'}`],
        checked ? styles['tog-root--checked'] : '',
        disabled ? styles['tog-root--disabled'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-checked={checked}
        className={styles['tog-native']}
      />

      <span
        className={[
          styles['tog-track'],
          checked ? styles['tog-track--on'] : styles['tog-track--off'],
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      >
        <span className={styles['tog-thumb']} />
      </span>

      {label && (
        <span className={styles['tog-label']}>{label}</span>
      )}
    </label>
  );
};

export default Toggle;
