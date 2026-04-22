import React, { useId } from 'react';
import styles from './Stepper.module.css';

export interface StepItem {
  id: string;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number; // 0-based index
  orientation?: 'horizontal' | 'vertical';
}

type StepStatus = 'completed' | 'current' | 'upcoming';

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
      <path d="M2.5 7l3.5 3.5 5.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface StepIndicatorProps {
  status: StepStatus;
  stepNumber: number;
}

function StepIndicator({ status, stepNumber }: StepIndicatorProps) {
  return (
    <div
      className={`${styles['stp-indicator']} ${styles[`stp-indicator--${status}`]}`}
      aria-hidden="true"
    >
      {status === 'completed' ? <CheckIcon /> : <span>{stepNumber + 1}</span>}
    </div>
  );
}

export function Stepper({ steps, currentStep, orientation = 'horizontal' }: StepperProps) {
  const uid = useId();

  function getStatus(index: number): StepStatus {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'upcoming';
  }

  return (
    <ol
      className={`${styles['stp-root']} ${styles[`stp-root--${orientation}`]}`}
      aria-label="Progreso del proceso"
    >
      {steps.map((step, index) => {
        const status = getStatus(index);
        const isLast = index === steps.length - 1;
        const stepId = `${uid}-step-${step.id}`;

        return (
          <li
            key={step.id}
            id={stepId}
            className={`${styles['stp-step']} ${styles[`stp-step--${status}`]} ${isLast ? styles['stp-step--last'] : ''}`}
            aria-current={status === 'current' ? 'step' : undefined}
          >
            <div className={styles['stp-step__body']}>
              <StepIndicator status={status} stepNumber={index} />

              <div className={styles['stp-step__text']}>
                <span className={styles['stp-step__label']}>{step.label}</span>
                {step.description && (
                  <span className={styles['stp-step__description']}>{step.description}</span>
                )}
              </div>
            </div>

            {/* Connector line between steps — omitted on last item */}
            {!isLast && <div className={`${styles['stp-connector']} ${styles[`stp-connector--${status}`]}`} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
