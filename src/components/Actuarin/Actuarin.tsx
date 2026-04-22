import React, { useId } from 'react';
import styles from './Actuarin.module.css';

type ActuarinSize = 'sm' | 'md' | 'lg';
type ActuarinExpression = 'happy' | 'thinking' | 'celebrating';

interface ActuarinProps {
  size?: ActuarinSize;
  expression?: ActuarinExpression;
  message?: string;
}

const SIZE_PX: Record<ActuarinSize, number> = {
  sm: 64,
  md: 96,
  lg: 128,
};

/** Face path data per expression */
function FaceFeatures({ expression }: { expression: ActuarinExpression }) {
  // All coordinates are relative to the head circle centred at (50, 42), r=22
  if (expression === 'happy') {
    return (
      <>
        {/* Eyes */}
        <circle cx="42" cy="38" r="2.5" fill="#151f47" />
        <circle cx="58" cy="38" r="2.5" fill="#151f47" />
        {/* Smile */}
        <path
          d="M43 46 Q50 53 57 46"
          stroke="#151f47"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </>
    );
  }

  if (expression === 'thinking') {
    return (
      <>
        {/* Eyes — one raised eyebrow */}
        <circle cx="42" cy="38" r="2.5" fill="#151f47" />
        <circle cx="58" cy="38" r="2.5" fill="#151f47" />
        {/* Raised eyebrow (left) */}
        <path d="M38 33 Q42 30 46 33" stroke="#151f47" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Flat right eyebrow */}
        <path d="M54 33 L62 33" stroke="#151f47" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Neutral mouth */}
        <path d="M44 48 L56 48" stroke="#151f47" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Thought dot */}
        <circle cx="66" cy="28" r="3" fill="#4c64d9" opacity="0.5" />
        <circle cx="72" cy="22" r="4" fill="#4c64d9" opacity="0.35" />
        <circle cx="79" cy="15" r="5.5" fill="#4c64d9" opacity="0.2" />
      </>
    );
  }

  // celebrating
  return (
    <>
      {/* Happy eyes — curved */}
      <path d="M39 37 Q42 34 45 37" stroke="#151f47" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M55 37 Q58 34 61 37" stroke="#151f47" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Big smile */}
      <path d="M41 46 Q50 56 59 46" stroke="#151f47" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* Confetti particles */}
      <rect x="20" y="10" width="4" height="4" rx="1" fill="#4c64d9" transform="rotate(20 22 12)" />
      <rect x="76" y="8"  width="4" height="4" rx="1" fill="#f59e0b" transform="rotate(-15 78 10)" />
      <rect x="14" y="28" width="3" height="3" rx="1" fill="#10b981" transform="rotate(35 15 29)" />
      <rect x="82" y="25" width="3" height="3" rx="1" fill="#ef4444" transform="rotate(-30 83 26)" />
      <circle cx="28" cy="15" r="2.5" fill="#f59e0b" opacity="0.8" />
      <circle cx="72" cy="18" r="2"   fill="#4c64d9" opacity="0.7" />
    </>
  );
}

export const Actuarin: React.FC<ActuarinProps> = ({
  size = 'md',
  expression = 'happy',
  message,
}) => {
  const bubbleId = useId();
  const px = SIZE_PX[size];

  return (
    <div className={`${styles['actn-root']} ${styles[`actn-root--${size}`]}`}>
      {/* Speech bubble — rendered above the character */}
      {message && (
        <div
          id={bubbleId}
          className={styles['actn-bubble']}
          role="note"
          aria-label={`Actuarín dice: ${message}`}
        >
          {message}
        </div>
      )}

      {/* SVG mascot */}
      <svg
        width={px}
        height={px}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Actuarín — expresión: ${expression}`}
        className={styles['actn-svg']}
      >
        {/* ── Body ── */}
        {/* Torso */}
        <rect x="30" y="68" width="40" height="38" rx="10" fill="#4c64d9" />

        {/* Collar / shirt detail */}
        <path d="M40 68 L50 78 L60 68" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

        {/* Arms */}
        <rect x="14" y="70" width="16" height="10" rx="5" fill="#4c64d9" />
        <rect x="70" y="70" width="16" height="10" rx="5" fill="#4c64d9" />

        {/* Hands (circles) */}
        <circle cx="14" cy="80" r="5" fill="#f9d8b0" />
        <circle cx="86" cy="80" r="5" fill="#f9d8b0" />

        {/* Right hand holding tiny calculator */}
        <rect x="79" y="85" width="12" height="10" rx="2" fill="#151f47" />
        <rect x="80.5" y="86.5" width="3" height="2" rx="0.5" fill="#4c64d9" />
        <rect x="84.5" y="86.5" width="3" height="2" rx="0.5" fill="#4c64d9" />
        <rect x="80.5" y="89.5" width="3" height="2" rx="0.5" fill="#4c64d9" />
        <rect x="84.5" y="89.5" width="3" height="2" rx="0.5" fill="#4c64d9" />

        {/* Legs */}
        <rect x="35" y="104" width="12" height="14" rx="6" fill="#151f47" />
        <rect x="53" y="104" width="12" height="14" rx="6" fill="#151f47" />

        {/* Feet */}
        <ellipse cx="41" cy="118" rx="8" ry="4" fill="#151f47" />
        <ellipse cx="59" cy="118" rx="8" ry="4" fill="#151f47" />

        {/* ── Neck ── */}
        <rect x="44" y="62" width="12" height="8" rx="3" fill="#f9d8b0" />

        {/* ── Head ── */}
        <circle cx="50" cy="42" r="22" fill="#f9d8b0" />

        {/* Hair — simple top arc */}
        <path
          d="M28 42 Q28 18 50 18 Q72 18 72 42"
          fill="#151f47"
        />

        {/* Ear pads */}
        <ellipse cx="28" cy="42" rx="4" ry="5" fill="#f9d8b0" />
        <ellipse cx="72" cy="42" rx="4" ry="5" fill="#f9d8b0" />

        {/* Expression-specific face features */}
        <FaceFeatures expression={expression} />

        {/* Glasses (always present — actuarial flair) */}
        <circle cx="42" cy="38" r="7" stroke="#151f47" strokeWidth="1.5" fill="none" />
        <circle cx="58" cy="38" r="7" stroke="#151f47" strokeWidth="1.5" fill="none" />
        <line x1="49" y1="38" x2="51" y2="38" stroke="#151f47" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="37" x2="35" y2="37" stroke="#151f47" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="65" y1="37" x2="72" y2="37" stroke="#151f47" strokeWidth="1.5" strokeLinecap="round" />

        {/* Tiny bar-chart on left hand side — actuarial flavour */}
        <rect x="8"  y="90" width="3" height="8" rx="1" fill="#4c64d9" opacity="0.7" />
        <rect x="12" y="87" width="3" height="11" rx="1" fill="#4c64d9" opacity="0.9" />
        <rect x="16" y="84" width="3" height="14" rx="1" fill="#4c64d9" />
      </svg>
    </div>
  );
};

export default Actuarin;
