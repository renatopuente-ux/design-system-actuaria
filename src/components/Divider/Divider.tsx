import React from 'react';
import styles from './Divider.module.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** Optional label centered within the divider line */
  label?: string;
  /** Extra margin in pixels on both sides of the line — defaults to 0 */
  spacing?: number;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  spacing = 0,
}) => {
  const isVertical = orientation === 'vertical';

  const inlineStyle = spacing
    ? isVertical
      ? { marginLeft: spacing, marginRight: spacing }
      : { marginTop: spacing, marginBottom: spacing }
    : undefined;

  if (isVertical) {
    return (
      <span
        className={styles['dv-root--vertical']}
        style={inlineStyle}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (label) {
    return (
      <div
        className={styles['dv-root--labeled']}
        style={inlineStyle}
        role="separator"
        aria-label={label}
      >
        <span className={styles['dv-line']} />
        <span className={styles['dv-label']}>{label}</span>
        <span className={styles['dv-line']} />
      </div>
    );
  }

  return (
    <hr
      className={styles['dv-root']}
      style={inlineStyle}
      aria-orientation="horizontal"
    />
  );
};

export default Divider;
