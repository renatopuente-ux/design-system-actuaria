/* ═══════════════════════════════════════════════════════════════
   Card — Actuaria Design System
   Figma node: 3472:58376  ·  fileKey: N1wh3u4sX3UGyUU5oWOaz6
   ═══════════════════════════════════════════════════════════════ */
import React from 'react';
import styles from './Card.module.css';

export type CardType = 'Vertical' | 'Horizontal';

export interface CardProps {
  type?:      CardType;
  /** Image element rendered at the top (Vertical) or left (Horizontal). Pass an <img> with object-fit cover. */
  image?:     React.ReactNode;
  /** SVG icon rendered inside the circular brand-weak container. */
  icon?:      React.ReactNode;
  /** Uppercase caption rendered above the heading. */
  label?:     React.ReactNode;
  /** Main card title. */
  heading?:   React.ReactNode;
  /** Secondary body text. */
  body?:      React.ReactNode;
  /** Footer area — use for text links, AvatarLabelled, Tag chips, etc. */
  footer?:    React.ReactNode;
  /** Extra custom content appended after the footer. */
  children?:  React.ReactNode;
  onClick?:   (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  'aria-label'?: string;
}

export function Card({
  type      = 'Vertical',
  image,
  icon,
  label,
  heading,
  body,
  footer,
  children,
  onClick,
  className,
  'aria-label': ariaLabel,
}: CardProps) {
  const isClickable = Boolean(onClick);

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
      } : undefined}
      className={[
        styles['card-root'],
        styles[`card-type--${type.toLowerCase()}`],
        isClickable ? styles['card-root--clickable'] : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Image — top for Vertical, left for Horizontal */}
      {image && (
        <div className={styles['card-image']}>
          {image}
        </div>
      )}

      {/* Content */}
      <div className={styles['card-content']}>
        {/* Icon + text group */}
        {(icon || label || heading || body) && (
          <div className={styles['card-body-section']}>
            {icon && (
              <div className={styles['card-icon-container']} aria-hidden="true">
                {icon}
              </div>
            )}
            {(label || heading || body) && (
              <div className={styles['card-text']}>
                {(label || heading) && (
                  <div className={styles['card-heading']}>
                    {label && <span className={styles['card-label']}>{label}</span>}
                    {heading && <h3 className={styles['card-title']}>{heading}</h3>}
                  </div>
                )}
                {body && <p className={styles['card-body-text']}>{body}</p>}
              </div>
            )}
          </div>
        )}

        {/* Footer slot */}
        {footer && (
          <div className={styles['card-footer']}>
            {footer}
          </div>
        )}

        {/* Additional custom content */}
        {children}
      </div>
    </div>
  );
}

export default Card;
