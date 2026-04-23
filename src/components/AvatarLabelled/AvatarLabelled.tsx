import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import styles from './AvatarLabelled.module.css';

export interface AvatarLabelledProps {
  size?: 'Small' | 'Medium' | 'Large';
  src?: string;
  initials?: string;
  name: string;
  email?: string;
  className?: string;
}

export const AvatarLabelled: React.FC<AvatarLabelledProps> = ({
  size = 'Small',
  src,
  initials,
  name,
  email,
  className,
}) => {
  const sizeLower = size.toLowerCase() as 'small' | 'medium' | 'large';
  const avatarType = src ? 'Photo' : initials ? 'Initials' : 'Icon';

  const rootClass = [styles['avl-root'], styles[`avl-root--${sizeLower}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass}>
      <Avatar type={avatarType} size={size} src={src} initials={initials} alt={name} />
      <div className={styles['avl-text']}>
        <span className={styles[`avl-name--${sizeLower}`]}>{name}</span>
        {email && size !== 'Small' && (
          <span className={styles['avl-email']}>{email}</span>
        )}
      </div>
    </div>
  );
};

export default AvatarLabelled;
