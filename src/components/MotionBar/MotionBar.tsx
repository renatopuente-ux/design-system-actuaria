import React, { useEffect, useState, useRef } from 'react';
import styles from './MotionBar.module.css';

export interface MotionBarProps {
  value: number;
  target: number;
  duration?: number;
  color?: string;
  label?: string;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MotionBar: React.FC<MotionBarProps> = ({
  value,
  target,
  duration = 1000,
  color,
  label,
  unit = '',
  size = 'md',
  className = '',
}) => {
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;
    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * value));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration]);

  const pct = Math.min(100, Math.max(0, (value / target) * 100));
  const barPct = Math.min(100, Math.max(0, (displayed / target) * 100));

  return (
    <div
      className={[styles.mb, className].filter(Boolean).join(' ')}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={target}
      aria-label={label}
    >
      {label && <p className={styles.mb__label}>{label}</p>}
      <div className={[styles.mb__track, styles[`mb__track--${size}`]].join(' ')}>
        <div
          className={styles.mb__fill}
          style={{
            width: `${barPct}%`,
            backgroundColor: color ?? 'var(--interactive-action, #4c64d9)',
            transition: 'none',
          }}
        />
      </div>
      <div className={styles.mb__footer}>
        <span className={styles.mb__current}>{displayed.toLocaleString()}{unit}</span>
        <span className={styles.mb__target}>/ {target.toLocaleString()}{unit}</span>
        <span className={styles.mb__pct}>{Math.round(pct)}%</span>
      </div>
    </div>
  );
};

export default MotionBar;
