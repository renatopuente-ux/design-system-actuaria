import React from 'react';
import styles from './Avatar.module.css';

export type AvatarType = 'Photo' | 'Icon' | 'Initials' | 'Logo';
export type AvatarSize = 'Small' | 'Medium' | 'Large';

export interface AvatarProps {
  type?: AvatarType;
  size?: AvatarSize;
  src?: string;
  initials?: string;
  alt?: string;
  status?: boolean;
  notification?: boolean;
  className?: string;
}

function UserIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles['av-icon']}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export const Avatar: React.FC<AvatarProps> = ({
  type = 'Icon',
  size = 'Small',
  src,
  initials = 'AD',
  alt,
  status,
  notification,
  className,
}) => {
  const rootClass = [
    styles['av-root'],
    styles[`av-root--${size.toLowerCase()}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles['av-wrapper']}>
      <div className={rootClass} role="img" aria-label={alt ?? initials}>
        {(type === 'Photo' || type === 'Logo') && src ? (
          <img src={src} alt={alt ?? ''} className={styles['av-img']} draggable={false} />
        ) : type === 'Initials' ? (
          <span className={styles[`av-initials--${size.toLowerCase()}`]} aria-hidden="true">
            {initials}
          </span>
        ) : (
          <UserIcon />
        )}
      </div>
      {status && (
        <span
          className={[styles['av-dot'], styles['av-dot--status'], styles[`av-dot--status-${size.toLowerCase()}`]].join(' ')}
          aria-label="En línea"
        />
      )}
      {notification && (
        <span
          className={[styles['av-dot'], styles['av-dot--notif'], styles[`av-dot--notif-${size.toLowerCase()}`]].join(' ')}
          aria-label="Notificación"
        />
      )}
    </div>
  );
};

export default Avatar;
