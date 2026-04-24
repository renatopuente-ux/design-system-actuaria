import React from 'react';
import { RatingIcon, RatingIconType } from '../RatingIcon/RatingIcon';
import styles from './Rating.module.css';

export type RatingLayout = 'Horizontal' | 'Vertical';
export type { RatingIconType as RatingType };

export interface RatingProps {
  /** 0–5, supports .5 increments */
  value?: number;
  type?: RatingIconType;
  layout?: RatingLayout;
  showNumber?: boolean;
  showReviews?: boolean;
  reviewCount?: number;
  onReviewClick?: () => void;
  max?: number;
  /** Interactive mode — calls onChange on icon click */
  onChange?: (value: number) => void;
  readonly?: boolean;
  /** @deprecated use value */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function getState(index: number, value: number): 'Full' | 'Half' | 'Empty' {
  if (value >= index + 1) return 'Full';
  if (value >= index + 0.5) return 'Half';
  return 'Empty';
}

export const Rating: React.FC<RatingProps> = ({
  value = 3.5,
  type = 'Star',
  layout = 'Horizontal',
  showNumber = true,
  showReviews = true,
  reviewCount = 23,
  onReviewClick,
  max = 5,
  onChange,
  readonly = true,
  className,
}) => {
  const isVertical = layout === 'Vertical';
  const displayValue = value % 1 === 0 ? `${value}.0` : String(value);

  return (
    <div
      className={[
        styles['rt-root'],
        isVertical ? styles['rt-root--vertical'] : styles['rt-root--horizontal'],
        className,
      ].filter(Boolean).join(' ')}
      role="group"
      aria-label={`Valoración: ${value} de ${max}`}
    >
      {/* Icons + number */}
      <div className={styles['rt-stars-row']}>
        <div className={styles['rt-icons']}>
          {Array.from({ length: max }, (_, i) => (
            <span
              key={i}
              onClick={() => !readonly && onChange?.(i + 1)}
              style={!readonly ? { cursor: 'pointer' } : undefined}
              aria-label={`${i + 1} de ${max}`}
            >
              <RatingIcon type={type} state={getState(i, value)} />
            </span>
          ))}
        </div>
        {showNumber && (
          <span className={styles['rt-number']}>{displayValue}</span>
        )}
      </div>

      {/* Reviews block */}
      {showReviews && (
        <div className={[styles['rt-reviews'], isVertical ? styles['rt-reviews--vertical'] : ''].filter(Boolean).join(' ')}>
          {isVertical && <span className={styles['rt-from']}>From</span>}
          {onReviewClick ? (
            <button type="button" className={styles['rt-reviews-link']} onClick={onReviewClick}>
              ({reviewCount} reviews)
            </button>
          ) : (
            <span className={styles['rt-reviews-text']}>({reviewCount} reviews)</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Rating;
