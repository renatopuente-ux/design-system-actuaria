import React from 'react';
import styles from './BadgeCount.module.css';

export interface BadgeCountProps {
  count: number;
  /** Numbers above max render as "{max}+" — defaults to 99 */
  max?: number;
  /** Overrides the background color. Accepts any valid CSS color value. */
  color?: string;
}

export const BadgeCount: React.FC<BadgeCountProps> = ({
  count,
  max = 99,
  color,
}) => {
  const displayValue = count > max ? `${max}+` : String(count);

  return (
    <span
      className={styles['bdc-root']}
      style={color ? { backgroundColor: color } : undefined}
      aria-label={`${count} notificaciones`}
      role="status"
    >
      {displayValue}
    </span>
  );
};

export default BadgeCount;
