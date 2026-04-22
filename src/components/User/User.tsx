import React from 'react';
import styles from './User.module.css';

export interface UserProps {
  name: string;
  role: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

export const User: React.FC<UserProps> = ({
  name,
  role,
  avatarUrl,
  size = 'md',
  className = '',
}) => {
  return (
    <div
      className={[styles.us, styles[`us--${size}`], className].filter(Boolean).join(' ')}
      aria-label={`${name}, ${role}`}
    >
      <div className={styles.us__avatar}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className={styles.us__avatar_img} />
        ) : (
          <span className={styles.us__initials}>{getInitials(name)}</span>
        )}
      </div>
      <div className={styles.us__info}>
        <span className={styles.us__name}>{name}</span>
        <span className={styles.us__role}>{role}</span>
      </div>
    </div>
  );
};

export default User;
