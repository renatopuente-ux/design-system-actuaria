import React from 'react';
import styles from './Hero.module.css';

interface HeroAction {
  label: string;
  onClick: () => void;
}

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  align?: 'left' | 'center';
  badge?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  align = 'center',
  badge,
}) => {
  return (
    <section
      className={`${styles['hr-root']} ${align === 'left' ? styles['hr-root--left'] : styles['hr-root--center']}`}
      aria-label={title}
    >
      <div className={styles['hr-content']}>
        {badge && (
          <span className={styles['hr-badge']} aria-label={`Badge: ${badge}`}>
            {badge}
          </span>
        )}

        {subtitle && (
          <p className={styles['hr-subtitle']}>{subtitle}</p>
        )}

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
      </div>
    </section>
  );
};
