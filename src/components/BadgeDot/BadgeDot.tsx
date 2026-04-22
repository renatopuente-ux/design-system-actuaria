import React from 'react';
import styles from './BadgeDot.module.css';

export interface BadgeDotProps {
  /** Overrides dot color. Accepts any valid CSS color value. */
  color?: string;
  /** Dot diameter in pixels — defaults to 8 */
  size?: number;
  /** Emits a scale+fade keyframe animation to signal activity */
  pulse?: boolean;
}

export const BadgeDot: React.FC<BadgeDotProps> = ({
  color,
  size = 8,
  pulse = false,
}) => {
  return (
    <span
      className={[
        styles['bdd-root'],
        pulse ? styles['bdd-root--pulse'] : '',
      ].join(' ')}
      style={{
        width: size,
        height: size,
        ...(color ? { backgroundColor: color } : {}),
      }}
      role="status"
      aria-label="indicador de estado"
    />
  );
};

export default BadgeDot;
