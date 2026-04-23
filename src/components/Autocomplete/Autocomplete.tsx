/* ═══════════════════════════════════════════════════════════════
   Autocomplete — Actuaria Design System
   Figma node: 7895:213246  ·  fileKey: N1wh3u4sX3UGyUU5oWOaz6
   ═══════════════════════════════════════════════════════════════ */
import React, { useId, useState, useRef, useEffect, useCallback } from 'react';
import styles from './Autocomplete.module.css';

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps {
  /** Single = text input that selects one; Multiple = checkbox list with tags */
  type?:           'Single' | 'Multiple';
  label?:          string;
  /** Helper text shown below label */
  hint?:           string;
  required?:       boolean;
  optional?:       boolean;
  placeholder?:    string;
  options?:        AutocompleteOption[];
  /** Controlled input text */
  inputValue?:     string;
  /** Controlled selected values (Multiple) */
  selectedValues?: string[];
  onInputChange?:  (v: string) => void;
  /** Single: called when option is picked */
  onSelect?:       (value: string) => void;
  /** Multiple: called when checkbox is toggled */
  onToggle?:       (value: string) => void;
  onClear?:        () => void;
  disabled?:       boolean;
  errorMessage?:   string;
  className?:      string;
}

// ── Inline SVG icons ───────────────────────────────────────
function IcoSearch() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IcoClose({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IcoError() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="0.8" fill="currentColor" />
    </svg>
  );
}

// Checkbox used in Multiple dropdown items
function IcoCheckbox({ checked }: { checked: boolean }) {
  return checked ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="4"
        fill="var(--fill-brand-strong, #151f47)" />
      <path d="M7 12l4 4 6-7" stroke="white"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      aria-hidden="true" focusable="false">
      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="3.25"
        fill="white" stroke="rgba(0,13,77,0.45)" strokeWidth="1.5" />
    </svg>
  );
}

export function Autocomplete({
  type           = 'Single',
  label,
  hint,
  required       = false,
  optional       = false,
  placeholder,
  options        = [],
  inputValue     = '',
  selectedValues = [],
  onInputChange,
  onSelect,
  onToggle,
  onClear,
  disabled       = false,
  errorMessage,
  className,
}: AutocompleteProps) {
  const uid        = useId();
  const inputId    = `${uid}-input`;
  const listId     = `${uid}-list`;
  const isMultiple = type === 'Multiple';
  const isInvalid  = Boolean(errorMessage);
  const isFilled   = isMultiple ? selectedValues.length > 0 : inputValue.length > 0;

  const [open, setOpen]               = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options by input text
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange?.(e.target.value);
    setOpen(true);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true);
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
      if (activeIndex >= 0 && filtered[activeIndex]) {
        const opt = filtered[activeIndex];
        if (isMultiple) {
          onToggle?.(opt.value);
        } else {
          onSelect?.(opt.value);
          onInputChange?.(opt.label);
          close();
        }
      }
    } else if (e.key === 'Escape') {
      close();
    }
  };

  const handleOptionClick = (opt: AutocompleteOption) => {
    if (isMultiple) {
      onToggle?.(opt.value);
      inputRef.current?.focus();
    } else {
      onSelect?.(opt.value);
      onInputChange?.(opt.label);
      close();
      inputRef.current?.focus();
    }
  };

  const handleClear = () => {
    onClear?.();
    onInputChange?.('');
    setOpen(false);
    inputRef.current?.focus();
  };

  const showDropdown = open && filtered.length > 0 && !disabled;
  const activeDescendant = open && activeIndex >= 0
    ? `${listId}-opt-${activeIndex}`
    : undefined;

  return (
    <div
      className={[styles['ac-root'], className].filter(Boolean).join(' ')}
      ref={rootRef}
    >
      {/* Label + hint */}
      {(label || hint) && (
        <div className={styles['ac-text']}>
          {label && (
            <div className={styles['ac-label-row']}>
              <label htmlFor={inputId} className={styles['ac-label']}>
                {label}
              </label>
              {required && <span className={styles['ac-required']} aria-hidden="true">*</span>}
              {optional && <span className={styles['ac-optional']}>(optional)</span>}
            </div>
          )}
          {hint && <p className={styles['ac-hint']}>{hint}</p>}
        </div>
      )}

      {/* Error message (shown above field, below hint) */}
      {isInvalid && (
        <div className={styles['ac-error-wrap']} role="alert">
          <span className={styles['ac-error-icon']}><IcoError /></span>
          <span className={styles['ac-error-text']}>{errorMessage}</span>
        </div>
      )}

      {/* Field + dropdown wrapper */}
      <div className={styles['ac-field-wrap']}>
        <div className={[
          styles['ac-field'],
          isInvalid  ? styles['ac-field--error']    : '',
          disabled   ? styles['ac-field--disabled'] : '',
          open       ? styles['ac-field--open']     : '',
        ].filter(Boolean).join(' ')}>

          {/* Search icon */}
          <span className={[
            styles['ac-search-icon'],
            isInvalid ? styles['ac-search-icon--error'] : '',
          ].filter(Boolean).join(' ')}>
            <IcoSearch />
          </span>

          {/* Multiple: tag group */}
          {isMultiple && selectedValues.length > 0 && (
            <div className={styles['ac-tag-group']}>
              {selectedValues.map((val) => {
                const opt = options.find((o) => o.value === val);
                return (
                  <span key={val} className={styles['ac-tag']}>
                    <span className={styles['ac-tag-label']}>{opt?.label ?? val}</span>
                    <button
                      type="button"
                      className={styles['ac-tag-close']}
                      onClick={() => !disabled && onToggle?.(val)}
                      aria-label={`Quitar ${opt?.label ?? val}`}
                      tabIndex={-1}
                    >
                      <IcoClose size={16} />
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          {/* Input */}
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeDescendant}
            aria-invalid={isInvalid}
            aria-required={required}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => !disabled && setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            className={styles['ac-input']}
          />

          {/* Clear button */}
          {isFilled && !disabled && (
            <button
              type="button"
              className={styles['ac-clear']}
              onClick={handleClear}
              aria-label="Limpiar selección"
              tabIndex={-1}
            >
              <IcoClose size={24} />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <ul
            id={listId}
            role="listbox"
            aria-multiselectable={isMultiple}
            className={styles['ac-dropdown']}
          >
            {filtered.map((opt, idx) => {
              const isSelected = isMultiple
                ? selectedValues.includes(opt.value)
                : inputValue === opt.label;
              return (
                <li
                  key={opt.value}
                  id={`${listId}-opt-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleOptionClick(opt)}
                  className={[
                    styles['ac-dropdown-item'],
                    isSelected  ? styles['ac-dropdown-item--selected'] : '',
                    idx === activeIndex ? styles['ac-dropdown-item--active'] : '',
                  ].filter(Boolean).join(' ')}
                >
                  {isMultiple && (
                    <span className={styles['ac-dropdown-item__check']}>
                      <IcoCheckbox checked={isSelected} />
                    </span>
                  )}
                  <span className={styles['ac-dropdown-item__label']}>{opt.label}</span>
                </li>
              );
            })}
          </ul>
        )}

        {/* Empty state */}
        {open && filtered.length === 0 && inputValue.length > 0 && !disabled && (
          <div className={styles['ac-dropdown']} role="status" aria-live="polite">
            <p className={styles['ac-dropdown-empty']}>Sin resultados para &ldquo;{inputValue}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Autocomplete;
