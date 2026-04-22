import React, { useState, useRef, useEffect } from 'react';
import styles from './DropdownMenu.module.css';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  align?: 'left' | 'right';
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  onSelect,
  align = 'left',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleSelect = (item: DropdownItem) => {
    if (item.disabled) return;
    onSelect(item.value);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={[styles.dd, className].filter(Boolean).join(' ')}
    >
      <div
        className={styles.dd__trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {trigger}
      </div>
      {open && (
        <ul
          className={[styles.dd__menu, styles[`dd__menu--${align}`]].join(' ')}
          role="listbox"
        >
          {items.map((item) => (
            <li
              key={item.value}
              role="option"
              aria-selected={false}
              aria-disabled={item.disabled}
              className={[
                styles.dd__item,
                item.disabled ? styles['dd__item--disabled'] : '',
                item.danger ? styles['dd__item--danger'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleSelect(item)}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(item)}
              tabIndex={item.disabled ? -1 : 0}
            >
              {item.icon && (
                <span className={styles.dd__icon} aria-hidden="true">
                  {item.icon}
                </span>
              )}
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
