import React, { useState } from 'react';
import styles from './CardFlip.module.css';

interface CardFlipProps {
  front: React.ReactNode;
  back: React.ReactNode;
  /** When true, flip triggers on hover; when false, flip triggers on click */
  triggerOnHover?: boolean;
}

export const CardFlip: React.FC<CardFlipProps> = ({
  front,
  back,
  triggerOnHover = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (!triggerOnHover) {
      setIsFlipped((prev) => !prev);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Allow keyboard activation for click-mode cards (WCAG 2.1 — 2.1.1 Keyboard)
    if (!triggerOnHover && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div
      className={`${styles['cf-root']} ${isFlipped ? styles['cf-root--flipped'] : ''}`}
      onMouseEnter={() => triggerOnHover && setIsFlipped(true)}
      onMouseLeave={() => triggerOnHover && setIsFlipped(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={triggerOnHover ? undefined : 'button'}
      tabIndex={triggerOnHover ? undefined : 0}
      aria-pressed={triggerOnHover ? undefined : isFlipped}
      aria-label={isFlipped ? 'Tarjeta volteada — presiona para volver' : 'Presiona para voltear la tarjeta'}
    >
      <div className={styles['cf-inner']}>
        {/* Front face */}
        <div
          className={`${styles['cf-face']} ${styles['cf-face--front']}`}
          aria-hidden={isFlipped}
        >
          {front}
        </div>

        {/* Back face — rotated 180deg; backface-visibility:hidden hides it until flip */}
        <div
          className={`${styles['cf-face']} ${styles['cf-face--back']}`}
          aria-hidden={!isFlipped}
        >
          {back}
        </div>
      </div>
    </div>
  );
};
