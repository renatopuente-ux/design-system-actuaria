import React from 'react';
import styles from './Hero.module.css';

export type HeroType =
  | 'horizontal'
  | 'horizontal-padded'
  | 'vertical'
  | 'vertical-large'
  | 'vertical-small';

export interface HeroAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export interface HeroProps {
  type?: HeroType;
  image?: React.ReactNode;
  tag?: string;
  uppercase?: boolean;
  title: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  emailCapture?: React.ReactNode;
  socialProof?: React.ReactNode;
  className?: string;
}

const VERTICAL_TYPES: HeroType[] = ['vertical', 'vertical-large', 'vertical-small'];

export const Hero: React.FC<HeroProps> = ({
  type = 'horizontal',
  image,
  tag,
  uppercase = false,
  title,
  description,
  primaryAction,
  secondaryAction,
  emailCapture,
  socialProof,
  className,
}) => {
  const isVertical = VERTICAL_TYPES.includes(type);

  const rootClass = [
    styles['hr-root'],
    styles[`hr-root--${type}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const tagClass = [
    styles['hr-tag'],
    uppercase ? styles['hr-tag--uppercase'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const contentArea = (
    <div className={styles['hr-content']}>
      {tag && <span className={tagClass}>{tag}</span>}

      <h1 className={styles['hr-title']}>{title}</h1>

      {description && (
        <p className={styles['hr-description']}>{description}</p>
      )}

      {(primaryAction || secondaryAction) && (
        <div className={styles['hr-actions']}>
          {primaryAction && (
            <button
              type="button"
              className={styles['hr-btn-primary']}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button
              type="button"
              className={styles['hr-btn-secondary']}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}

      {emailCapture && (
        <div className={styles['hr-email-capture']}>{emailCapture}</div>
      )}

      {socialProof && (
        <div className={styles['hr-social-proof']}>{socialProof}</div>
      )}
    </div>
  );

  if (isVertical) {
    return (
      <section className={rootClass} aria-label={title}>
        {contentArea}
        {image && (
          <div className={styles['hr-image-wrap']}>
            {image}
          </div>
        )}
      </section>
    );
  }

  // Horizontal layouts: content left, image right inside flex row
  return (
    <section className={rootClass} aria-label={title}>
      <div className={styles['hr-row']}>
        {contentArea}
        {image && (
          <div className={styles['hr-image-wrap']}>
            {image}
          </div>
        )}
      </div>
    </section>
  );
};
