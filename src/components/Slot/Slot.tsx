import React from 'react';
import styles from './Slot.module.css';

export interface SlotProps {
  children?: React.ReactNode;
  /** Shown instead of children when children is null/undefined */
  fallback?: React.ReactNode;
  /** Custom placeholder text shown when both children and fallback are absent */
  placeholder?: string;
  className?: string;
}

export const Slot: React.FC<SlotProps> = ({
  children,
  fallback,
  placeholder = 'Intercambiar con otro componente',
  className = '',
}) => {
  const isEmpty = children == null && fallback == null;

  if (isEmpty) {
    return (
      <div
        className={[styles['slot-empty'], className].filter(Boolean).join(' ')}
        role="presentation"
        aria-label={placeholder}
      >
        <p className={styles['slot-label']}>{placeholder}</p>
      </div>
    );
  }

  return (
    <div className={className || undefined}>
      {children ?? fallback}
    </div>
  );
};

export default Slot;
