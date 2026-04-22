import React, { useId } from 'react';
import styles from './BarChart.module.css';

export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarChartDataPoint[];
  height?: number;
  title?: string;
  showValues?: boolean;
  maxValue?: number;
  className?: string;
}

const PALETTE = ['#4c64d9', '#151f47', '#6078ec', '#a1b0eb', '#10B981', '#F59E0B', '#3B82F6', '#9CA3AF'];

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 240,
  title,
  showValues = true,
  maxValue: maxValueProp,
  className = '',
}) => {
  const id = useId();
  if (!data.length) return null;

  const maxVal = maxValueProp ?? Math.max(...data.map((d) => d.value));
  const gridLines = 4;
  const paddingLeft = 48;
  const paddingBottom = 32;
  const paddingTop = showValues ? 24 : 12;
  const chartHeight = height - paddingBottom - paddingTop;
  const barWidth = 32;
  const barGap = 16;
  const totalWidth = data.length * (barWidth + barGap) - barGap + paddingLeft + 16;

  return (
    <div className={[styles.bc, className].filter(Boolean).join(' ')}>
      {title && <p className={styles.bc__title}>{title}</p>}
      <svg
        width="100%"
        viewBox={`0 0 ${totalWidth} ${height}`}
        role="img"
        aria-label={title ?? 'Gráfico de barras'}
        style={{ display: 'block' }}
      >
        {/* Grid lines */}
        {Array.from({ length: gridLines + 1 }).map((_, i) => {
          const y = paddingTop + (chartHeight / gridLines) * i;
          const val = Math.round(maxVal - (maxVal / gridLines) * i);
          return (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={totalWidth - 8}
                y2={y}
                stroke="rgba(0,17,102,0.1)"
                strokeWidth={1}
              />
              <text
                x={paddingLeft - 6}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fontFamily="Nunito, sans-serif"
                fill="rgba(0,9,51,0.65)"
              >
                {val.toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const barH = maxVal > 0 ? (d.value / maxVal) * chartHeight : 0;
          const x = paddingLeft + i * (barWidth + barGap);
          const y = paddingTop + chartHeight - barH;
          const color = d.color ?? PALETTE[i % PALETTE.length];
          const labelId = `${id}-bar-${i}`;

          return (
            <g key={i} aria-labelledby={labelId}>
              <title id={labelId}>{`${d.label}: ${d.value.toLocaleString()}`}</title>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={6}
                fill={color}
                opacity={0.9}
              />
              {showValues && (
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="Nunito, sans-serif"
                  fontWeight="600"
                  fill={color}
                >
                  {d.value.toLocaleString()}
                </text>
              )}
              <text
                x={x + barWidth / 2}
                y={paddingTop + chartHeight + 16}
                textAnchor="middle"
                fontSize="11"
                fontFamily="Nunito, sans-serif"
                fill="rgba(0,9,51,0.65)"
              >
                {d.label.length > 8 ? d.label.slice(0, 7) + '…' : d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BarChart;
