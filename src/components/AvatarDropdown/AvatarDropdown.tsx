import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import styles from './AvatarDropdown.module.css';

export type AvatarDropdownType = 'Button' | 'Navigation side';
export type AvatarDropdownState = 'Default' | 'Hover' | 'Focused' | 'Pressed' | 'Disabled' | 'Open';

export interface AvatarDropdownProps {
  type?: AvatarDropdownType;
  name: string;
  src?: string;
  initials?: string;
  open?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

function ChevronDown(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles['avd-chevron']}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUp(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles['avd-chevron']}>
      <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoreHorizontal(): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles['avd-chevron']}>
      <circle cx="5" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  type = 'Button',
  name,
  src,
  initials,
  open = false,
  disabled = false,
  onClick,
  className,
}) => {
  const isNav = type === 'Navigation side';
  const avatarType = src ? 'Photo' : initials ? 'Initials' : 'Icon';

  const rootClass = [
    styles['avd-root'],
    isNav ? styles['avd-root--nav'] : styles['avd-root--button'],
    open ? styles['avd-root--open'] : '',
    disabled ? styles['avd-root--disabled'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={rootClass}
      disabled={disabled}
      onClick={onClick}
      aria-expanded={open}
      aria-haspopup="true"
    >
      <Avatar type={avatarType} size="Small" src={src} initials={initials} alt={name} />
      <span className={styles['avd-name']}>{name}</span>
      {isNav ? <MoreHorizontal /> : open ? <ChevronUp /> : <ChevronDown />}
    </button>
  );
};

export default AvatarDropdown;
