import React, { useId, useRef, useState } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delay = 200,
}) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <span
      className={styles['tt-wrapper']}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {/* Render children with aria-describedby pointing to the tooltip */}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            'aria-describedby': visible ? tooltipId : undefined,
          })
        : children}

      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          className={`${styles['tt-bubble']} ${styles[`tt-bubble--${placement}`]}`}
        >
          {content}
          <span className={`${styles['tt-arrow']} ${styles[`tt-arrow--${placement}`]}`} aria-hidden="true" />
        </span>
      )}
    </span>
  );
};
