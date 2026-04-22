import React, { useId } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

/**
 * Toggle — pill-shaped on/off switch.
 * md: 40×24px track, sm: 32×18px track.
 * On state: --interactive-action track. Off state: --stroke-weak track.
 * The thumb translates horizontally via CSS transform for smooth animation.
 */
export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
}) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={[
        styles['tg-root'],
        disabled ? styles['tg-root--disabled'] : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Native checkbox hidden behind the visual toggle */}
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-checked={checked}
        className={styles['tg-native']}
      />

      <span
        className={[
          styles['tg-track'],
          styles[`tg-track--${size}`],
          checked ? styles['tg-track--on'] : styles['tg-track--off'],
          disabled ? styles['tg-track--disabled'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      >
        <span
          className={[
            styles['tg-thumb'],
            styles[`tg-thumb--${size}`],
            checked ? styles['tg-thumb--on'] : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      </span>

      {label && (
        <span className={styles['tg-label']}>{label}</span>
      )}
    </label>
  );
};
