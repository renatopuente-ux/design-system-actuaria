import React from 'react';
import styles from './Testimonial.module.css';

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  /** Rating from 1 to 5 */
  rating?: number;
}

/** Renders filled or empty star SVG icons — no emoji dependency */
const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className={`${styles['ts-star']} ${filled ? styles['ts-star--filled'] : styles['ts-star--empty']}`}
  >
    <path
      d="M8 1.333L9.857 5.893L14.667 6.28L11.2 9.307L12.267 14L8 11.44L3.733 14L4.8 9.307L1.333 6.28L6.143 5.893L8 1.333Z"
      fill="currentColor"
    />
  </svg>
);

export const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  company,
  avatar,
  rating,
}) => {
  const clampedRating = rating !== undefined ? Math.min(5, Math.max(0, Math.round(rating))) : undefined;

  return (
    <article className={styles['ts-root']} aria-label={`Testimonio de ${author}`}>
      {/* Large decorative quote mark — aria-hidden, purely visual */}
      <span className={styles['ts-quote-mark']} aria-hidden="true">&ldquo;</span>

      {/* Optional star rating */}
      {clampedRating !== undefined && (
        <div
          className={styles['ts-rating']}
          role="img"
          aria-label={`Calificación: ${clampedRating} de 5 estrellas`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < clampedRating} />
          ))}
        </div>
      )}

      {/* Quote body */}
      <blockquote className={styles['ts-body']}>
        <p className={styles['ts-text']}>{quote}</p>
      </blockquote>

      {/* Author row */}
      <footer className={styles['ts-author-row']}>
        {avatar && (
          <img
            src={avatar}
            alt={`Foto de ${author}`}
            className={styles['ts-avatar']}
            width={44}
            height={44}
          />
        )}
        {!avatar && (
          // Fallback initials avatar when no image is provided
          <div className={styles['ts-avatar-fallback']} aria-hidden="true">
            {author.charAt(0).toUpperCase()}
          </div>
        )}
        <div className={styles['ts-author-info']}>
          <span className={styles['ts-author-name']}>{author}</span>
          {(role || company) && (
            <span className={styles['ts-author-meta']}>
              {role}{role && company ? ' · ' : ''}{company}
            </span>
          )}
        </div>
      </footer>
    </article>
  );
};
