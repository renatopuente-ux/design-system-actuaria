import React from 'react';
import styles from './IconContainer.module.css';

type IconContainerSize = 'sm' | 'md' | 'lg';
type IconContainerVariant = 'default' | 'brand' | 'success' | 'warning' | 'error';
type IconContainerShape = 'circle' | 'square';

interface IconContainerProps {
  children: React.ReactNode;
  size?: IconContainerSize;
  variant?: IconContainerVariant;
  shape?: IconContainerShape;
  /** Accessible label for the container (pass if icon is purely decorative and parent provides context) */
  'aria-label'?: string;
}

export const IconContainer: React.FC<IconContainerProps> = ({
  children,
  size = 'md',
  variant = 'default',
  shape = 'square',
  'aria-label': ariaLabel,
}) => {
  return (
    <span
      className={[
        styles['ic-root'],
        styles[`ic-root--${size}`],
        styles[`ic-root--${variant}`],
        styles[`ic-root--${shape}`],
      ].join(' ')}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      {children}
    </span>
  );
};

export default IconContainer;
