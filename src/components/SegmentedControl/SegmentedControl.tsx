import React, { useId } from 'react';
import styles from './SegmentedControl.module.css';
import { SegmentedControlItem } from '../SegmentedControlItem/SegmentedControlItem';

export interface SegmentOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'Medium' | 'Small';
  'aria-label'?: string;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  size = 'Medium',
  'aria-label': ariaLabel = 'Opciones',
  className = '',
}) => {
  const groupId = useId();

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={[styles['sc-root'], className].filter(Boolean).join(' ')}
    >
      {options.map((option) => (
        <SegmentedControlItem
          key={option.value}
          id={`${groupId}-${option.value}`}
          label={option.label}
          icon={option.icon}
          selected={option.value === value}
          size={size}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  );
};

export default SegmentedControl;
