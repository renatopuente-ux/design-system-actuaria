import React, { useEffect, useState } from 'react';
import styles from './MotionBar.module.css';

export interface MotionBarItem {
  label: string;
  value: number;
  color: string;
}

export interface MotionBarProps {
  title: string;
  bars: MotionBarItem[];
  maxValue?: number;
  className?: string;
}

const VIEW_W = 400;
const VIEW_H = 250;
const MARGIN_LEFT = 50;
const MARGIN_TOP = 10;
const PLOT_W = 340; // x: 50 → 390
const PLOT_H = 230; // y: 10 → 240
const Y_STEPS = [0, 50, 100, 150, 200, 250, 300];
const BAR_W = 36;

export const MotionBar: React.FC<MotionBarProps> = ({
  title,
  bars,
  maxValue = 300,
  className,
}) => {
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setGrown(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const n = bars.length;
  const slotW = PLOT_W / n;

  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      <p className={styles.title}>{title}</p>

      <div className={styles.chartArea}>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className={styles.svg}
          role="img"
          aria-label={title}
        >
          {/* Y-axis grid lines and labels */}
          {Y_STEPS.map((step) => {
            const y = MARGIN_TOP + PLOT_H - (step / maxValue) * PLOT_H;
            const isSolid = step === 0;
            return (
              <g key={step}>
                <line
                  x1={MARGIN_LEFT}
                  y1={y}
                  x2={390}
                  y2={y}
                  stroke="rgba(0,17,102,0.12)"
                  strokeWidth={1}
                  strokeDasharray={isSolid ? undefined : '4 4'}
                />
                <text
                  x={44}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="8"
                  fontWeight="600"
                  letterSpacing="0.8"
                  fontFamily="Nunito, sans-serif"
                  fill="#666666"
                >
                  {step}
                </text>
              </g>
            );
          })}

          {/* Vertical dashed lines at bar centers */}
          {bars.map((_, i) => {
            const cx = MARGIN_LEFT + i * slotW + slotW / 2;
            return (
              <line
                key={i}
                x1={cx}
                y1={MARGIN_TOP}
                x2={cx}
                y2={MARGIN_TOP + PLOT_H}
                stroke="rgba(0,17,102,0.08)"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Bars */}
          {bars.map((bar, i) => {
            const barH = maxValue > 0 ? (bar.value / maxValue) * PLOT_H : 0;
            const cx = MARGIN_LEFT + i * slotW + slotW / 2;
            const bx = cx - BAR_W / 2;
            const by = MARGIN_TOP + PLOT_H - barH;

            return (
              <g key={i}>
                <rect
                  x={bx}
                  y={by}
                  width={BAR_W}
                  height={barH}
                  rx={4}
                  fill={bar.color}
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'bottom',
                    transform: grown ? 'scaleY(1)' : 'scaleY(0)',
                    transition: `transform ${0.6 + i * 0.08}s cubic-bezier(0.4, 0, 0.2, 1)`,
                  }}
                />
                {grown && (
                  <text
                    x={cx}
                    y={by - 6}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="400"
                    fontFamily="Nunito, sans-serif"
                    fill="rgba(0,6,38,0.9)"
                    style={{
                      opacity: grown ? 1 : 0,
                      transition: `opacity ${0.6 + i * 0.08}s cubic-bezier(0.4, 0, 0.2, 1)`,
                    }}
                  >
                    {bar.value}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* X-axis labels */}
      <div className={styles.xAxis}>
        {bars.map((bar, i) => {
          const parts = bar.label.split('\n');
          return (
            <div key={i} className={styles.xLabel}>
              {parts.map((part, j) => (
                <span key={j}>{part}</span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MotionBar;
