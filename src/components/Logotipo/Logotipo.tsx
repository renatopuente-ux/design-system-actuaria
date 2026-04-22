import React from 'react';
import styles from './Logotipo.module.css';

type LogotipoVariant = 'full' | 'icon';
type LogotipoTheme = 'light' | 'dark';
type LogotipoSize = 'sm' | 'md' | 'lg';

interface LogotipoProps {
  variant?: LogotipoVariant;
  theme?: LogotipoTheme;
  size?: LogotipoSize;
}

/** Height in pixels for each size, keeping aspect ratio for full variant */
const SIZE_MAP: Record<LogotipoSize, number> = {
  sm: 28,
  md: 36,
  lg: 48,
};

export const Logotipo: React.FC<LogotipoProps> = ({
  variant = 'full',
  theme = 'light',
  size = 'md',
}) => {
  const height = SIZE_MAP[size];
  const navyColor = theme === 'dark' ? '#ffffff' : '#151f47';
  const indigoColor = '#4c64d9';

  if (variant === 'icon') {
    /* Monogram "A" inside a circle */
    return (
      <svg
        className={`${styles['lo-root']} ${styles[`lo-root--${size}`]}`}
        height={height}
        width={height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Actuaria Consultores"
      >
        <circle cx="20" cy="20" r="20" fill={indigoColor} />
        {/* Stylised "A" — two diagonal strokes + crossbar */}
        <path
          d="M13 29L20 11L27 29"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="15.5"
          y1="23"
          x2="24.5"
          y2="23"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  /* Full wordmark: "ACTUARIA" + "consultores" */
  return (
    <svg
      className={`${styles['lo-root']} ${styles[`lo-root--${size}`]}`}
      height={height}
      viewBox="0 0 220 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Actuaria Consultores"
    >
      {/* Monogram circle icon */}
      <circle cx="20" cy="20" r="18" fill={indigoColor} />
      <path
        d="M13.5 28L20 12L26.5 28"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="15.5"
        y1="22.5"
        x2="24.5"
        y2="22.5"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* "ACTUARIA" — SemiBold Nunito rendered as text */}
      <text
        x="46"
        y="22"
        fontFamily="'Nunito', sans-serif"
        fontWeight="600"
        fontSize="18"
        fill={navyColor}
        letterSpacing="2"
        dominantBaseline="middle"
      >
        ACTUARIA
      </text>

      {/* "consultores" — Regular, smaller, indigo */}
      <text
        x="47"
        y="34"
        fontFamily="'Nunito', sans-serif"
        fontWeight="400"
        fontSize="9"
        fill={indigoColor}
        letterSpacing="1.5"
        dominantBaseline="middle"
      >
        CONSULTORES
      </text>
    </svg>
  );
};

export default Logotipo;
