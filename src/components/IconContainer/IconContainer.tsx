import React from 'react';
import styles from './IconContainer.module.css';

export type IconContainerTone =
  | 'Neutral'
  | 'Brand'
  | 'Inverse'
  | 'Destructive'
  | 'Warning'
  | 'Success'
  | 'Information';

export type IconContainerStyle = 'Filled' | 'Stroked';

type IconContainerSize = 'sm' | 'md' | 'lg';

export interface IconContainerProps {
  children: React.ReactNode;
  /** Figma tone — controls background and icon color */
  tone?: IconContainerTone;
  /** Figma style — Stroked adds a border around the container */
  iconStyle?: IconContainerStyle;
  /** Size: sm=32px md=40px lg=48px (Figma spec is lg) */
  size?: IconContainerSize;
  /** Accessible label for the container */
  'aria-label'?: string;
}

export const IconContainer: React.FC<IconContainerProps> = ({
  children,
  tone = 'Neutral',
  iconStyle = 'Filled',
  size = 'lg',
  'aria-label': ariaLabel,
}) => {
  return (
    <span
      className={[
        styles['ic-root'],
        styles[`ic-root--${size}`],
        styles[`ic-tone-${tone.toLowerCase()}`],
        iconStyle === 'Stroked' ? styles['ic-stroked'] : '',
      ].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      {children}
    </span>
  );
};

export default IconContainer;
