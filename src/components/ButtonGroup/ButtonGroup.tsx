import React from 'react';
import styles from './ButtonGroup.module.css';

export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  className = '',
}) => {
  return (
    <div
      className={[
        styles.bg,
        styles[`bg--${orientation}`],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="group"
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
