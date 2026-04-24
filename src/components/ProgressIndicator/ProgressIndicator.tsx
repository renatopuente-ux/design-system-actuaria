import React from 'react';
import styles from './ProgressIndicator.module.css';

export interface ProgressIndicatorProps {
  /** Current step (1-based) */
  step: number;
  /** Total number of steps. Default: 8 */
  totalSteps?: number;
  /** Show "Volver" back link */
  showBack?: boolean;
  onBack?: () => void;
  backLabel?: string;
  className?: string;
}

const ArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M15.833 10H4.167M4.167 10l5 5M4.167 10l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  step,
  totalSteps = 8,
  showBack = true,
  onBack,
  backLabel = 'Volver',
  className,
}) => {
  const clamped = Math.min(totalSteps, Math.max(1, step));

  return (
    <div className={[styles['pi-root'], className].filter(Boolean).join(' ')}>
      <div className={styles['pi-top']}>
        <p className={styles['pi-label']}>Paso {clamped} de {totalSteps}</p>
        <div className={styles['pi-track']} role="progressbar" aria-valuenow={clamped} aria-valuemin={1} aria-valuemax={totalSteps} aria-label={`Paso ${clamped} de ${totalSteps}`}>
          {Array.from({ length: totalSteps }, (_, i) => {
            const idx = i + 1;
            const isActive = idx <= clamped;
            return (
              <span
                key={idx}
                className={[
                  styles['pi-segment'],
                  isActive ? styles['pi-segment--active'] : styles['pi-segment--inactive'],
                ].join(' ')}
              />
            );
          })}
        </div>
      </div>

      {showBack && (
        <button
          type="button"
          className={styles['pi-back']}
          onClick={onBack}
          aria-label={backLabel}
        >
          <ArrowLeft />
          <span>{backLabel}</span>
        </button>
      )}
    </div>
  );
};

export default ProgressIndicator;
