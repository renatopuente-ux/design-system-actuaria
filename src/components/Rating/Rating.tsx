import React, { useId, useState } from 'react';
import styles from './Rating.module.css';

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readonly?: boolean;
  size?: RatingSize;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 5,
  readonly = false,
  size = 'md',
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const groupId = useId();

  // Effective display value: hovered index takes priority over selected value
  const displayValue = hovered ?? value;

  const handleClick = (index: number) => {
    if (!readonly) onChange?.(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (readonly) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange?.(index);
    }
  };

  return (
    <span
      className={`${styles['rt-root']} ${styles[`rt-root--${size}`]}`}
      role="group"
      aria-label={`Valoración: ${value} de ${max} estrellas`}
      id={groupId}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= displayValue;

        return (
          <span
            key={starValue}
            className={`${styles['rt-star']} ${filled ? styles['rt-star--filled'] : styles['rt-star--empty']}`}
            role={readonly ? 'img' : 'button'}
            aria-label={`${starValue} estrella${starValue !== 1 ? 's' : ''}`}
            aria-pressed={readonly ? undefined : starValue === value}
            tabIndex={readonly ? -1 : 0}
            onClick={() => handleClick(starValue)}
            onKeyDown={(e) => handleKeyDown(e, starValue)}
            onMouseEnter={() => !readonly && setHovered(starValue)}
            onMouseLeave={() => !readonly && setHovered(null)}
          >
            {/* SVG star for crisp rendering at all sizes */}
            <svg viewBox="0 0 20 20" aria-hidden="true" className={styles['rt-icon']}>
              <path d="M10 1.25l2.472 5.009 5.528.803-4 3.897.944 5.5L10 13.762l-4.944 2.697.944-5.5-4-3.897 5.528-.803L10 1.25z" />
            </svg>
          </span>
        );
      })}
    </span>
  );
};
