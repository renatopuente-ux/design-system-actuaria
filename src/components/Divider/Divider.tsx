import React from 'react';
import styles from './Divider.module.css';

export type DividerType = 'Weak' | 'Strong';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** 'Weak' uses --stroke-weak (default); 'Strong' uses --stroke-strong */
  type?: DividerType;
  /** Optional label centered within the divider line */
  label?: string;
  /** Extra margin in pixels on both sides of the line — defaults to 0 */
  spacing?: number;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  type = 'Weak',
  label,
  spacing = 0,
}) => {
  const isVertical = orientation === 'vertical';
  const isStrong = type === 'Strong';

  const inlineStyle = spacing
    ? isVertical
      ? { marginLeft: spacing, marginRight: spacing }
      : { marginTop: spacing, marginBottom: spacing }
    : undefined;

  if (isVertical) {
    return (
      <span
        className={[
          styles['dv-root--vertical'],
          isStrong ? styles['dv-root--strong'] : '',
        ].filter(Boolean).join(' ')}
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
        <span className={[styles['dv-line'], isStrong ? styles['dv-line--strong'] : ''].filter(Boolean).join(' ')} />
        <span className={styles['dv-label']}>{label}</span>
        <span className={[styles['dv-line'], isStrong ? styles['dv-line--strong'] : ''].filter(Boolean).join(' ')} />
      </div>
    );
  }

  return (
    <hr
      className={[styles['dv-root'], isStrong ? styles['dv-root--strong'] : ''].filter(Boolean).join(' ')}
      style={inlineStyle}
      aria-orientation="horizontal"
    />
  );
};

export default Divider;
