import React from 'react';
import styles from './Slot.module.css';

interface SlotProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

/**
 * Generic layout placeholder.
 * - Renders children if provided.
 * - Renders fallback if no children.
 * - Renders a dashed placeholder box when both are absent — useful for design-system demos.
 */
export const Slot: React.FC<SlotProps> = ({ children, fallback, className }) => {
  const isEmpty = children == null && fallback == null;

  if (isEmpty) {
    return (
      <div
        className={`${styles['slot-root']} ${styles['slot-root--empty']} ${className ?? ''}`}
        aria-label="Slot vacío"
        role="presentation"
      >
        <span className={styles['slot-label']}>Slot</span>
      </div>
    );
  }

  return (
    <div className={`${styles['slot-root']} ${className ?? ''}`}>
      {children ?? fallback}
    </div>
  );
};

export default Slot;
