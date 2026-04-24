import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from 'react';
import styles from './DropdownMenu.module.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DropdownItemType =
  | 'default'
  | 'checkbox'
  | 'secondary-text'
  | 'avatar'
  | 'heading'
  | 'divider';

export interface DropdownItem {
  type?: DropdownItemType;
  value?: string;
  label?: string;
  secondaryText?: string;
  icon?: React.ReactNode;
  checked?: boolean;
  avatarSrc?: string;
  avatarName?: string;
  avatarEmail?: string;
  selected?: boolean;
  disabled?: boolean;
  danger?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect?: (value: string, item: DropdownItem) => void;
  align?: 'bottom-left' | 'top-left' | 'bottom-right' | 'top-right';
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isInteractive(item: DropdownItem): boolean {
  const t = item.type ?? 'default';
  return t !== 'heading' && t !== 'divider' && !item.disabled;
}

function getInitials(name?: string): string {
  if (!name) return '?';
  return name.trim().charAt(0).toUpperCase();
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface CheckboxBoxProps {
  checked: boolean;
}

const CheckboxBox: React.FC<CheckboxBoxProps> = ({ checked }) => (
  <span
    className={[
      styles.checkboxBox,
      checked ? styles['checkboxBox--checked'] : '',
    ]
      .filter(Boolean)
      .join(' ')}
    aria-hidden="true"
  >
    {checked && (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 10L8 15L17 5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </span>
);

interface AvatarBubbleProps {
  src?: string;
  name?: string;
}

const AvatarBubble: React.FC<AvatarBubbleProps> = ({ src, name }) => (
  <span className={styles.avatarBubble} aria-hidden="true">
    {src ? (
      <img src={src} alt={name ?? ''} className={styles.avatarImg} />
    ) : (
      <span className={styles.avatarInitials}>{getInitials(name)}</span>
    )}
  </span>
);

// ---------------------------------------------------------------------------
// DropdownMenuItem
// ---------------------------------------------------------------------------

interface DropdownMenuItemProps {
  item: DropdownItem;
  focused: boolean;
  onSelect: (item: DropdownItem) => void;
  itemRef: (el: HTMLElement | null) => void;
  menuId: string;
  index: number;
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  item,
  focused,
  onSelect,
  itemRef,
  menuId,
  index,
}) => {
  const type = item.type ?? 'default';

  // ----- divider -----
  if (type === 'divider') {
    return (
      <li
        role="separator"
        className={styles.item__divider}
        aria-orientation="horizontal"
      />
    );
  }

  // ----- heading -----
  if (type === 'heading') {
    return (
      <li
        role="presentation"
        aria-disabled
        className={styles.item__heading}
        id={`${menuId}-heading-${index}`}
      >
        {item.label}
      </li>
    );
  }

  // ----- interactive items -----
  const handleClick = () => {
    if (!item.disabled) onSelect(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!item.disabled) onSelect(item);
    }
  };

  const classNames = [
    styles.item,
    item.selected ? styles['item--selected'] : '',
    item.disabled ? styles['item--disabled'] : '',
    item.danger ? styles['item--danger'] : '',
    focused ? styles['item--focused'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  // ----- avatar -----
  if (type === 'avatar') {
    return (
      <li
        ref={itemRef as React.Ref<HTMLLIElement>}
        role="menuitem"
        tabIndex={item.disabled ? -1 : 0}
        aria-disabled={item.disabled}
        className={classNames}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-focused={focused || undefined}
      >
        <AvatarBubble src={item.avatarSrc} name={item.avatarName} />
        <span className={styles.avatarText}>
          <span className={styles.avatarName}>{item.avatarName}</span>
          <span className={styles.avatarEmail}>{item.avatarEmail}</span>
        </span>
      </li>
    );
  }

  // ----- checkbox -----
  if (type === 'checkbox') {
    return (
      <li
        ref={itemRef as React.Ref<HTMLLIElement>}
        role="menuitemcheckbox"
        aria-checked={item.checked ?? false}
        tabIndex={item.disabled ? -1 : 0}
        aria-disabled={item.disabled}
        className={classNames}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-focused={focused || undefined}
      >
        <CheckboxBox checked={item.checked ?? false} />
        <span className={styles.itemLabel}>{item.label}</span>
      </li>
    );
  }

  // ----- secondary-text -----
  if (type === 'secondary-text') {
    return (
      <li
        ref={itemRef as React.Ref<HTMLLIElement>}
        role="menuitem"
        tabIndex={item.disabled ? -1 : 0}
        aria-disabled={item.disabled}
        className={classNames}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-focused={focused || undefined}
      >
        {item.icon && (
          <span className={styles.itemIcon} aria-hidden="true">
            {item.icon}
          </span>
        )}
        <span className={styles.itemTextStack}>
          <span className={styles.itemLabel}>{item.label}</span>
          {item.secondaryText && (
            <span className={styles.itemSecondary}>{item.secondaryText}</span>
          )}
        </span>
      </li>
    );
  }

  // ----- default -----
  return (
    <li
      ref={itemRef as React.Ref<HTMLLIElement>}
      role="menuitem"
      tabIndex={item.disabled ? -1 : 0}
      aria-disabled={item.disabled}
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-focused={focused || undefined}
    >
      {item.icon && (
        <span className={styles.itemIcon} aria-hidden="true">
          {item.icon}
        </span>
      )}
      <span className={styles.itemLabel}>{item.label}</span>
    </li>
  );
};

// ---------------------------------------------------------------------------
// DropdownMenu
// ---------------------------------------------------------------------------

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  onSelect,
  align = 'bottom-left',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const menuId = useId();

  // Indices of interactive items
  const interactiveIndices = items
    .map((item, i) => (isInteractive(item) ? i : -1))
    .filter((i) => i !== -1);

  const close = useCallback(() => {
    setOpen(false);
    setFocusedIndex(-1);
  }, []);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const handleOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open, close]);

  // Focus management: move DOM focus to the focused item
  useEffect(() => {
    if (open && focusedIndex >= 0) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [open, focusedIndex]);

  // Focus first interactive item when menu opens
  useEffect(() => {
    if (open && interactiveIndices.length > 0) {
      setFocusedIndex(interactiveIndices[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    const currentPos = interactiveIndices.indexOf(focusedIndex);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next =
        currentPos < interactiveIndices.length - 1 ? currentPos + 1 : 0;
      setFocusedIndex(interactiveIndices[next]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev =
        currentPos > 0 ? currentPos - 1 : interactiveIndices.length - 1;
      setFocusedIndex(interactiveIndices[prev]);
    }
  };

  const handleSelect = useCallback(
    (item: DropdownItem) => {
      if (item.value !== undefined) {
        onSelect?.(item.value, item);
      }
      close();
    },
    [onSelect, close],
  );

  const alignClass = styles[`menu--${align}`] ?? '';

  return (
    <div
      ref={containerRef}
      className={[styles.dd, className].filter(Boolean).join(' ')}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger wrapper */}
      <div
        className={styles.dd__trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
      >
        {trigger}
      </div>

      {/* Panel */}
      {open && (
        <ul
          ref={menuRef}
          id={menuId}
          role="menu"
          className={[styles.menu, alignClass].filter(Boolean).join(' ')}
        >
          {items.map((item, index) => (
            <DropdownMenuItem
              key={
                item.value ??
                `${item.type ?? 'item'}-${item.label ?? ''}-${index}`
              }
              item={item}
              focused={focusedIndex === index}
              onSelect={handleSelect}
              itemRef={(el) => {
                itemRefs.current[index] = el;
              }}
              menuId={menuId}
              index={index}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
