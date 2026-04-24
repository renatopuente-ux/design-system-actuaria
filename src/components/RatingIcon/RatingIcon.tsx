import React, { useId } from 'react';

export type RatingIconType = 'Star' | 'Heart';
export type RatingIconState = 'Empty' | 'Half' | 'Full';

export interface RatingIconProps {
  type?: RatingIconType;
  state?: RatingIconState;
  size?: number;
  className?: string;
}

const STAR_PATH = 'M12 2.5l2.63 5.33 5.87.85-4.25 4.14 1 5.85L12 15.77l-5.25 2.9 1-5.85L3.5 8.68l5.87-.85L12 2.5z';
const HEART_PATH = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

const STAR_COLOR_FULL = '#F5C518';
const STAR_COLOR_STROKE = '#F5A623';
const HEART_COLOR_FULL = '#C0392B';
const HEART_COLOR_STROKE = '#C0392B';

export const RatingIcon: React.FC<RatingIconProps> = ({
  type = 'Star',
  state = 'Empty',
  size = 24,
  className,
}) => {
  const clipId = useId();
  const isStar = type === 'Star';
  const path = isStar ? STAR_PATH : HEART_PATH;
  const fillColor = isStar ? STAR_COLOR_FULL : HEART_COLOR_FULL;
  const strokeColor = isStar ? STAR_COLOR_STROKE : HEART_COLOR_STROKE;

  if (state === 'Full') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <path d={path} fill={fillColor} />
      </svg>
    );
  }

  if (state === 'Empty') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <path d={path} fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    );
  }

  // Half — left half filled, right half outline via clipPath
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={`${clipId}-left`}>
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
        <clipPath id={`${clipId}-right`}>
          <rect x="12" y="0" width="12" height="24" />
        </clipPath>
      </defs>
      {/* Right half — outline */}
      <path d={path} fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" clipPath={`url(#${clipId}-right)`} />
      {/* Left half — filled */}
      <path d={path} fill={fillColor} clipPath={`url(#${clipId}-left)`} />
    </svg>
  );
};

export default RatingIcon;
