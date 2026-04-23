import React from 'react';
import styles from './AvatarStack.module.css';

export interface AvatarStackItem {
  src?: string;
  initials?: string;
  alt?: string;
}

export interface AvatarStackProps {
  avatars: AvatarStackItem[];
  maxVisible?: number;
  showCount?: boolean;
  countLabel?: string;
  size?: 'Small' | 'Medium' | 'Large';
  className?: string;
}

function UserIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles['avs-icon']}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export const AvatarStack: React.FC<AvatarStackProps> = ({
  avatars,
  maxVisible = 5,
  showCount = true,
  countLabel = '99+',
  size = 'Small',
  className,
}) => {
  const sizeLower = size.toLowerCase() as 'small' | 'medium' | 'large';
  const visible = avatars.slice(0, maxVisible);

  const rootClass = [styles['avs-root'], styles[`avs-root--${sizeLower}`], className]
    .filter(Boolean)
    .join(' ');

  const itemClass = [styles['avs-item'], styles[`avs-item--${sizeLower}`]].join(' ');
  const avatarClass = [styles['avs-avatar'], styles[`avs-avatar--${sizeLower}`]].join(' ');
  const initialsClass = styles[`avs-initials--${sizeLower}`];

  return (
    <div className={rootClass}>
      {visible.map((av, i) => (
        <div key={i} className={itemClass}>
          <div className={avatarClass} role="img" aria-label={av.alt ?? av.initials ?? 'Avatar'}>
            {av.src ? (
              <img src={av.src} alt={av.alt ?? ''} className={styles['avs-img']} draggable={false} />
            ) : av.initials ? (
              <span className={initialsClass} aria-hidden="true">{av.initials}</span>
            ) : (
              <UserIcon />
            )}
          </div>
        </div>
      ))}
      {showCount && (
        <div className={itemClass}>
          <div className={[avatarClass, styles['avs-avatar--count']].join(' ')} aria-label={countLabel}>
            <span className={initialsClass}>{countLabel}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarStack;
