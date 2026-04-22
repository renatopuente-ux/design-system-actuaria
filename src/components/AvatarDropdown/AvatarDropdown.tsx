import React, { useState, useRef, useEffect } from 'react';
import styles from './AvatarDropdown.module.css';

export interface AvatarUser {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface AvatarMenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}

export interface AvatarDropdownProps {
  user: AvatarUser;
  menuItems: AvatarMenuItem[];
  onSignOut?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  user,
  menuItems,
  onSignOut,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div ref={ref} className={styles.ad}>
      <button
        type="button"
        className={styles.ad__trigger}
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Menú de usuario: ${user.name}`}
      >
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} className={styles.ad__avatar} />
        ) : (
          <span className={styles.ad__initials}>{getInitials(user.name)}</span>
        )}
      </button>

      {open && (
        <div className={styles.ad__menu}>
          <div className={styles.ad__header}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className={styles['ad__avatar--lg']} />
            ) : (
              <span className={[styles.ad__initials, styles['ad__initials--lg']].join(' ')}>
                {getInitials(user.name)}
              </span>
            )}
            <div>
              <p className={styles.ad__name}>{user.name}</p>
              <p className={styles.ad__role}>{user.role}</p>
            </div>
          </div>
          <hr className={styles.ad__divider} />
          <ul className={styles.ad__list}>
            {menuItems.map((item, i) => (
              <li key={i}>
                <button
                  type="button"
                  className={[styles.ad__item, item.danger ? styles['ad__item--danger'] : ''].filter(Boolean).join(' ')}
                  onClick={() => { item.onClick(); setOpen(false); }}
                >
                  {item.icon && <span className={styles.ad__item_icon} aria-hidden="true">{item.icon}</span>}
                  {item.label}
                </button>
              </li>
            ))}
            {onSignOut && (
              <>
                <hr className={styles.ad__divider} />
                <li>
                  <button
                    type="button"
                    className={[styles.ad__item, styles['ad__item--danger']].join(' ')}
                    onClick={() => { onSignOut(); setOpen(false); }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
