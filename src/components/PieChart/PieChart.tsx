import React, { useState } from 'react';
import styles from './PieChart.module.css';

export interface PieChartSegment {
  label: string;
  percentage: number;
  amount?: number | string;
  color: string;
}

export interface PieChartProps {
  title: string;
  segments: PieChartSegment[];
  className?: string;
}

const CX = 140;
const CY = 140;
const R = 108;
const LABEL_R_RATIO = 0.63;

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const angle = (deg - 90) * (Math.PI / 180);
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

function buildArcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
): string {
  const [sx, sy] = polar(cx, cy, r, startDeg);
  const [ex, ey] = polar(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx},${cy} L ${sx},${sy} A ${r},${r},0,${largeArc},1,${ex},${ey} Z`;
}

function formatAmount(amount: number | string | undefined): string | null {
  if (amount === undefined || amount === null) return null;
  if (typeof amount === 'number') {
    return amount.toLocaleString('es-EC');
  }
  return String(amount);
}

export const PieChart: React.FC<PieChartProps> = ({ title, segments, className }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const total = segments.reduce((sum, s) => sum + s.percentage, 0);

  // Build slice data with start/end angles
  const slices = segments.map((seg, i) => {
    const startDeg = segments.slice(0, i).reduce((acc, s) => acc + (s.percentage / total) * 360, 0);
    const angleDeg = (seg.percentage / total) * 360;
    const endDeg = startDeg + angleDeg;
    const midDeg = startDeg + angleDeg / 2;
    const labelR = R * LABEL_R_RATIO;
    const [lx, ly] = polar(CX, CY, labelR, midDeg);
    return { ...seg, startDeg, endDeg, midDeg, lx, ly };
  });

  const halfLen = Math.ceil(segments.length / 2);
  const leftItems = slices.slice(0, halfLen);
  const rightItems = slices.slice(halfLen);

  function handleToggle(idx: number) {
    setActiveIdx((prev) => (prev === idx ? null : idx));
  }

  function getSliceOpacity(idx: number): number {
    if (activeIdx === null) return 1;
    return activeIdx === idx ? 1 : 0.2;
  }

  function getLegendClass(idx: number): string {
    if (activeIdx === null) return styles.legendItem;
    return activeIdx === idx ? styles.legendItem : `${styles.legendItem} ${styles.legendItem__dim}`;
  }

  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      <p className={styles.title}>{title}</p>

      <div className={styles.chartArea}>
        <svg viewBox="0 0 280 280" className={styles.svg} aria-label={title} role="img">
          {slices.map((slice, i) => {
            const path = buildArcPath(CX, CY, R, slice.startDeg, slice.endDeg);
            const labelColor = slice.percentage < 9 ? 'rgba(0,6,38,0.9)' : '#ffffff';
            const amountStr = formatAmount(slice.amount);

            return (
              <g
                key={i}
                onClick={() => handleToggle(i)}
                style={{
                  opacity: getSliceOpacity(i),
                  transition: 'opacity 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <path d={path} fill={slice.color} />
                <text
                  x={slice.lx}
                  y={amountStr ? slice.ly - 6 : slice.ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="Nunito, sans-serif"
                  letterSpacing="1"
                  fill={labelColor}
                >
                  {slice.percentage}%
                </text>
                {amountStr && (
                  <text
                    x={slice.lx}
                    y={slice.ly + 8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fontWeight="600"
                    fontFamily="Nunito, sans-serif"
                    letterSpacing="0.8"
                    fill={labelColor}
                  >
                    {amountStr}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendCol}>
          {leftItems.map((slice, i) => (
            <button
              key={i}
              className={getLegendClass(i)}
              onClick={() => handleToggle(i)}
              type="button"
            >
              <span
                className={styles.legendDot}
                style={{ background: slice.color }}
              />
              <span className={styles.legendLabel}>{slice.label}</span>
            </button>
          ))}
        </div>
        <div className={styles.legendCol}>
          {rightItems.map((slice, j) => {
            const globalIdx = halfLen + j;
            return (
              <button
                key={j}
                className={getLegendClass(globalIdx)}
                onClick={() => handleToggle(globalIdx)}
                type="button"
              >
                <span
                  className={styles.legendDot}
                  style={{ background: slice.color }}
                />
                <span className={styles.legendLabel}>{slice.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
