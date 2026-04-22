import React from 'react';
import styles from './Tracking.module.css';

type StepStatus = 'completed' | 'current' | 'pending';

interface TrackingStep {
  id: string;
  label: string;
  date?: string;
  description?: string;
  status: StepStatus;
}

interface TrackingProps {
  steps: TrackingStep[];
}

function StepIcon({ status }: { status: StepStatus }) {
  if (status === 'completed') {
    return (
      <svg
        className={styles['trk-icon']}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="10" fill="currentColor" />
        <path
          d="M5.5 10.5L8.5 13.5L14.5 7"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (status === 'current') {
    return (
      <svg
        className={`${styles['trk-icon']} ${styles['trk-icon--pulse']}`}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.15" />
        <circle cx="10" cy="10" r="6" fill="currentColor" />
      </svg>
    );
  }

  // pending
  return (
    <svg
      className={styles['trk-icon']}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export const Tracking: React.FC<TrackingProps> = ({ steps }) => {
  return (
    <ol className={styles['trk-root']} aria-label="Progreso de seguimiento">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li
            key={step.id}
            className={`${styles['trk-step']} ${styles[`trk-step--${step.status}`]}`}
            aria-current={step.status === 'current' ? 'step' : undefined}
          >
            {/* Left column: icon + connector line */}
            <div className={styles['trk-indicator']}>
              <StepIcon status={step.status} />
              {!isLast && (
                <div
                  className={`${styles['trk-connector']} ${
                    step.status === 'completed' ? styles['trk-connector--filled'] : ''
                  }`}
                />
              )}
            </div>

            {/* Right column: text content */}
            <div className={styles['trk-content']}>
              <div className={styles['trk-header']}>
                <span className={styles['trk-label']}>{step.label}</span>
                {step.date && (
                  <span className={styles['trk-date']}>{step.date}</span>
                )}
              </div>
              {step.description && (
                <p className={styles['trk-description']}>{step.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Tracking;
