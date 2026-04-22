import React, { useId, useState, useRef, useEffect, useCallback } from 'react';
import styles from './Autocomplete.module.css';

export interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

/**
 * Autocomplete — text input that filters a flat string list and shows matches.
 * Keyboard navigation: ArrowUp/Down traverse options, Enter selects, Escape closes.
 * Accessible: role="combobox" + role="listbox" + aria-activedescendant pattern.
 *
 * Filtering is case-insensitive substring match — appropriate for product/table lookups
 * where users may know partial names (e.g. "CNSF 2000" matches "CNSF 2000-I").
 */
export const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  disabled = false,
}) => {
  const id = useId();
  const inputId = `${id}-input`;
  const listId = `${id}-list`;
  const labelId = `${id}-label`;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Case-insensitive substring filter
  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(value.toLowerCase())
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  // Outside-click handler
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, close]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && filtered[activeIndex] !== undefined) {
        onChange(filtered[activeIndex]);
        close();
      }
    } else if (e.key === 'Escape') {
      close();
    }
  };

  const handleOptionClick = (opt: string) => {
    onChange(opt);
    close();
    inputRef.current?.focus();
  };

  const activeDescendant =
    isOpen && activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined;

  const showDropdown = isOpen && filtered.length > 0;

  return (
    <div className={styles['ac-root']} ref={rootRef}>
      {label && (
        <label id={labelId} htmlFor={inputId} className={styles['ac-label']}>
          {label}
        </label>
      )}

      <div className={styles['ac-field']}>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeDescendant}
          aria-labelledby={label ? labelId : undefined}
          value={value}
          onChange={handleInputChange}
          onFocus={() => value.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={[
            styles['ac-input'],
            disabled ? styles['ac-input--disabled'] : '',
          ]
            .filter(Boolean)
            .join(' ')}
          autoComplete="off"
        />

        {/* Search icon */}
        <svg
          className={styles['ac-icon']}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="6.5"
            cy="6.5"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 10L14 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showDropdown && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className={styles['ac-list']}
        >
          {filtered.map((opt, idx) => (
            <li
              key={opt}
              id={`${listId}-option-${idx}`}
              role="option"
              aria-selected={idx === activeIndex}
              onClick={() => handleOptionClick(opt)}
              className={[
                styles['ac-option'],
                idx === activeIndex ? styles['ac-option--active'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}

      {isOpen && filtered.length === 0 && value.length > 0 && (
        <div className={styles['ac-empty']} role="status">
          Sin resultados para "{value}"
        </div>
      )}
    </div>
  );
};
