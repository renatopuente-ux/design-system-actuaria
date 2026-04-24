import React from 'react';
import styles from './Tooltip.module.css';

export type TooltipType =
  | 'Bottom left'
  | 'Bottom right'
  | 'Bottom centre'
  | 'Left'
  | 'Right';

export interface TooltipProps {
  type?: TooltipType;
  size?: 'Small' | 'Large';
  heading?: boolean;
  headingText?: string;
  bodyText?: string;
  children?: React.ReactNode;
  className?: string;
}

const ArrowDown: React.FC = () => (
  <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M0 0H32L16 16L0 0Z" fill="#12131a" />
  </svg>
);

const ArrowLeft: React.FC = () => (
  <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M16 0V32L0 16L16 0Z" fill="#12131a" />
  </svg>
);

const ArrowRight: React.FC = () => (
  <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M0 0V32L16 16L0 0Z" fill="#12131a" />
  </svg>
);

const typeSlug = (t: TooltipType) => t.toLowerCase().replace(/\s+/g, '-');

export const Tooltip: React.FC<TooltipProps> = ({
  type = 'Bottom centre',
  size = 'Small',
  heading = false,
  headingText,
  bodyText,
  children,
  className = '',
}) => {
  const isBottom = type.startsWith('Bottom');
  const slug = typeSlug(type);

  const bubble = (
    <span
      role="tooltip"
      className={[
        styles['tt-bubble'],
        styles[`tt-bubble--${size === 'Small' ? 'small' : 'large'}`],
        styles[`tt-bubble--${slug}`],
      ].filter(Boolean).join(' ')}
    >
      {size === 'Large' ? (
        <>
          {heading && headingText && (
            <span className={styles['tt-heading']}>{headingText}</span>
          )}
          {bodyText && <span className={styles['tt-body']}>{bodyText}</span>}
          {children}
        </>
      ) : (
        <>{bodyText ?? children}</>
      )}
    </span>
  );

  const arrowDown = (
    <span
      className={[styles['tt-arrow'], styles[`tt-arrow--${slug}`]].join(' ')}
      aria-hidden="true"
    >
      <ArrowDown />
    </span>
  );

  const arrowSide = (
    <span className={styles['tt-arrow']} aria-hidden="true">
      {type === 'Left' ? <ArrowLeft /> : <ArrowRight />}
    </span>
  );

  return (
    <span
      className={[
        styles['tt-root'],
        isBottom ? styles['tt-root--bottom'] : styles['tt-root--side'],
        className,
      ].filter(Boolean).join(' ')}
    >
      {isBottom ? (
        <>
          {bubble}
          {arrowDown}
        </>
      ) : type === 'Left' ? (
        <>
          {arrowSide}
          {bubble}
        </>
      ) : (
        <>
          {bubble}
          {arrowSide}
        </>
      )}
    </span>
  );
};

export default Tooltip;
