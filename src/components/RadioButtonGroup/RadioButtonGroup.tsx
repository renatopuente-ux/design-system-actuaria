import React, { useId } from 'react';
import { RadioButton } from '../RadioButton/RadioButton';
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
  orientation?: 'vertical' | 'horizontal';
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  orientation = 'vertical',
}) => {
  const groupId = useId();
  const groupName = name ?? groupId;

  return (
    <fieldset className={styles.rbg}>
      {label && <legend className={styles.rbg__legend}>{label}</legend>}
      <div className={[styles.rbg__list, styles[`rbg__list--${orientation}`]].join(' ')}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            label={option.label}
            value={option.value}
            name={groupName}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={onChange}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default RadioButtonGroup;
