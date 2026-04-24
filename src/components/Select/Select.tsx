import React, { useId, useRef, useState, useEffect, useCallback } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  valid?: boolean;
  errorMessage?: string;
  /** @deprecated use valid=false + errorMessage */
  error?: string;
  disabled?: boolean;
  className?: string;
}

const ChevronDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronUp = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const XOctagonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2Z" stroke="#c73a3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8v4M12 16h.01" stroke="#c73a3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Select: React.FC<SelectProps> = ({
  options,
  value = '',
  onChange,
  placeholder = 'Seleccionar',
  label,
  required = false,
  optional = false,
  hint,
  valid = true,
  errorMessage,
  error,
  disabled = false,
  className,
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

  // Resolve error state — support legacy `error` prop
  const hasError = !valid || !!error;
  const errorText = errorMessage ?? error ?? 'Error message';

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  const openDropdown = useCallback(() => {
    if (disabled) return;
    const currentIndex = options.findIndex((o) => o.value === value);
    setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
    setIsOpen(true);
  }, [disabled, options, value]);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) closeDropdown();
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen, closeDropdown]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      isOpen ? closeDropdown() : openDropdown();
    }
    if (e.key === 'Escape') closeDropdown();
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { closeDropdown(); triggerRef.current?.focus(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setFocusedIndex((i) => Math.min(i + 1, options.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocusedIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      onChange?.(options[focusedIndex].value);
      closeDropdown();
      triggerRef.current?.focus();
    }
  };

  const handleOptionClick = (optValue: string) => {
    onChange?.(optValue);
    closeDropdown();
    triggerRef.current?.focus();
  };

  const activeDescendant = isOpen && focusedIndex >= 0 ? `${listId}-option-${focusedIndex}` : undefined;

  return (
    <div ref={rootRef} className={[styles['sl-root'], className].filter(Boolean).join(' ')}>
      {/* Label row */}
      {label && (
        <div className={styles['sl-label-row']}>
          <label id={`${id}-label`} htmlFor={triggerId} className={styles['sl-label']}>
            {label}
            {required && <span className={styles['sl-required']}> *</span>}
            {optional && <span className={styles['sl-optional']}> (opcional)</span>}
          </label>
          {hint && <p className={styles['sl-hint']}>{hint}</p>}
        </div>
      )}

      {/* Error block */}
      {hasError && (
        <div id={errorId} className={styles['sl-error']} role="alert">
          <XOctagonIcon />
          <span className={styles['sl-error-text']}>{errorText}</span>
        </div>
      )}

      {/* Trigger button */}
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
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        disabled={disabled}
        onClick={() => (isOpen ? closeDropdown() : openDropdown())}
        onKeyDown={handleTriggerKeyDown}
        className={[
          styles['sl-trigger'],
          isOpen ? styles['sl-trigger--open'] : '',
          hasError ? styles['sl-trigger--error'] : '',
          disabled ? styles['sl-trigger--disabled'] : '',
          !selectedOption ? styles['sl-trigger--placeholder'] : '',
        ].filter(Boolean).join(' ')}
      >
        <span className={styles['sl-trigger-text']}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={styles['sl-chevron']}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>

      {/* Dropdown list */}
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
              ].filter(Boolean).join(' ')}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
