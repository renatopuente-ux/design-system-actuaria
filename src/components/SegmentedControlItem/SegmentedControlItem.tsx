import React from 'react';
import styles from './SegmentedControlItem.module.css';

export interface SegmentedControlItemProps {
  label: string;
  selected?: boolean;
  size?: 'Medium' | 'Small';
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const SegmentedControlItem: React.FC<SegmentedControlItemProps> = ({
  label,
  selected = false,
  size = 'Medium',
  icon,
  onClick,
  disabled = false,
  id,
  className = '',
}) => {
  const isSmall = size === 'Small';

  return (
    <button
      id={id}
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      disabled={disabled}
      className={[
        styles['sci-btn'],
        selected ? styles['sci-btn--selected'] : '',
        isSmall ? styles['sci-btn--small'] : styles['sci-btn--medium'],
        disabled ? styles['sci-btn--disabled'] : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className={styles['sci-state']}>
        {icon && (
          <span className={[styles['sci-icon'], isSmall ? styles['sci-icon--small'] : styles['sci-icon--medium']].join(' ')}>
            {icon}
          </span>
        )}
        <span className={styles['sci-label']}>{label}</span>
      </span>
    </button>
  );
};

export default SegmentedControlItem;
