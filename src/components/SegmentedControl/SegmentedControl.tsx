import React, { useId } from 'react';
import styles from './SegmentedControl.module.css';

interface SegmentOption {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
  /** Accessible label for the control group */
  'aria-label'?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  size = 'md',
  'aria-label': ariaLabel = 'Segmented control',
}) => {
  const groupId = useId();

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`${styles['sc-root']} ${styles[`sc-root--${size}`]}`}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            id={`${groupId}-${option.value}`}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={`${styles['sc-option']} ${isActive ? styles['sc-option--active'] : ''}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
