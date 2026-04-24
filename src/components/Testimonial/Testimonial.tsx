import React from 'react';
import styles from './Testimonial.module.css';

const StarFilledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles['tm-star--filled']}>
    <path
      d="M12 2l2.582 5.236 5.778.84-4.18 4.072.987 5.752L12 15.27l-5.167 2.63.987-5.752L3.64 8.076l5.778-.84L12 2Z"
      fill="currentColor"
    />
  </svg>
);

const StarEmptyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles['tm-star--empty']}>
    <path
      d="M12 2l2.582 5.236 5.778.84-4.18 4.072.987 5.752L12 15.27l-5.167 2.63.987-5.752L3.64 8.076l5.778-.84L12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export interface TestimonialProps {
  align?: 'Left' | 'Centre';
  authorName?: string;
  authorEmail?: string;
  authorAvatar?: string;
  quote?: string;
  rating?: number;
  className?: string;
}

export const Testimonial: React.FC<TestimonialProps> = ({
  align = 'Left',
  authorName,
  authorEmail,
  authorAvatar,
  quote,
  rating,
  className = '',
}) => {
  const isCentre = align === 'Centre';
  const clampedRating =
    rating !== undefined ? Math.min(5, Math.max(0, Math.round(rating))) : undefined;

  return (
    <article
      className={[
        styles['tm-root'],
        isCentre ? styles['tm-root--centre'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={authorName ? `Testimonio de ${authorName}` : 'Testimonio'}
    >
      {/* Avatar + name + email */}
      {authorName && (
        <div className={styles['tm-author']}>
          <div className={styles['tm-avatar-wrap']}>
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={`Foto de ${authorName}`}
                className={styles['tm-avatar']}
              />
            ) : (
              <div className={styles['tm-avatar-fallback']} aria-hidden="true">
                {authorName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className={styles['tm-author-text']}>
            <span className={styles['tm-author-name']}>{authorName}</span>
            {authorEmail && (
              <span className={styles['tm-author-email']}>{authorEmail}</span>
            )}
          </div>
        </div>
      )}

      {/* Quote text */}
      {quote && (
        <p className={styles['tm-quote']}>{quote}</p>
      )}

      {/* Star rating */}
      {clampedRating !== undefined && (
        <div
          className={styles['tm-rating']}
          role="img"
          aria-label={`Calificación: ${clampedRating} de 5 estrellas`}
        >
          {Array.from({ length: 5 }, (_, i) =>
            i < clampedRating ? <StarFilledIcon key={i} /> : <StarEmptyIcon key={i} />,
          )}
        </div>
      )}
    </article>
  );
};

export default Testimonial;
