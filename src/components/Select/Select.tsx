import React, { useId, useRef, useState, useEffect, useCallback } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
}

/**
 * Select — custom dropdown replacing the native <select>.
 * Outside-click closes the list via a document-level mousedown listener.
 * Keyboard: Enter/Space open, ArrowUp/Down navigate, Enter selects, Escape closes.
 * Accessible: combobox role + aria-expanded + aria-activedescendant.
 */
export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Selecciona una opción',
  label,
  error,
  disabled = false,
}) => {
  const id = useId();
  const triggerId = `${id}-trigger`;
  const listId = `${id}-list`;
  const errorId = `${id}-error`;

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  const close = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  const open = useCallback(() => {
    if (disabled) return;
    const currentIndex = options.findIndex((o) => o.value === value);
    setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
    setIsOpen(true);
  }, [disabled, options, value]);

  // Close on outside click — prevents stale event refs by using refs in handler
  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen, close]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      open();
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
      triggerRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      onChange(options[focusedIndex].value);
      close();
      triggerRef.current?.focus();
    }
  };

  const handleOptionClick = (optValue: string) => {
    onChange(optValue);
    close();
    triggerRef.current?.focus();
  };

  const activeDescendant =
    isOpen && focusedIndex >= 0 ? `${listId}-option-${focusedIndex}` : undefined;

  return (
    <div className={styles['sl-root']} ref={rootRef}>
      {label && (
        <label id={`${id}-label`} className={styles['sl-label']}>
          {label}
        </label>
      )}

      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-labelledby={label ? `${id}-label ${triggerId}` : triggerId}
        aria-activedescendant={activeDescendant}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        disabled={disabled}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleTriggerKeyDown}
        className={[
          styles['sl-trigger'],
          isOpen ? styles['sl-trigger--open'] : '',
          error ? styles['sl-trigger--error'] : '',
          disabled ? styles['sl-trigger--disabled'] : '',
          !selectedOption ? styles['sl-trigger--placeholder'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className={styles['sl-trigger-text']}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={[
            styles['sl-chevron'],
            isOpen ? styles['sl-chevron--open'] : '',
          ]
            .filter(Boolean)
            .join(' ')}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          className={styles['sl-list']}
        >
          {options.map((opt, idx) => (
            <li
              key={opt.value}
              id={`${listId}-option-${idx}`}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => handleOptionClick(opt.value)}
              className={[
                styles['sl-option'],
                opt.value === value ? styles['sl-option--selected'] : '',
                idx === focusedIndex ? styles['sl-option--focused'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <span id={errorId} className={styles['sl-error']} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
