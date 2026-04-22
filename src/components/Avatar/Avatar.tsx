import React, { useId } from 'react';
import styles from './Avatar.module.css';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
  /** Override background color via a CSS color value (applied as inline style) */
  color?: string;
}

/** Extracts up to 2 initials from a full name string */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  color,
}) => {
  const labelId = useId();
  const initials = name ? getInitials(name) : '?';
  const ariaLabel = name ?? 'Avatar';

  return (
    <div
      className={`${styles['av-root']} ${styles[`av-root--${size}`]}`}
      style={color ? { backgroundColor: color } : undefined}
      role="img"
      aria-label={ariaLabel}
      aria-labelledby={name ? labelId : undefined}
    >
      {src ? (
        <img
          className={styles['av-image']}
          src={src}
          alt={ariaLabel}
          draggable={false}
        />
      ) : (
        <span id={labelId} className={styles['av-initials']} aria-hidden="true">
          {initials}
        </span>
      )}
    </div>
  );
};

export default Avatar;
