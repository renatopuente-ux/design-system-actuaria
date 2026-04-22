import React, { useId, useState, useRef, useEffect, useCallback } from 'react';
import styles from './Combobox.module.css';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  clearable?: boolean;
}

/**
 * Combobox — hybrid of Select + free-text input.
 * The user can type to filter options OR pick from the dropdown list.
 * Selecting an option writes its label into the input and its value to onChange.
 * When clearable=true, an × button appears when there is any text.
 *
 * Internal state:
 *   - inputText: what's displayed in the input (label of selected option OR free text)
 *   - selectedValue: the structured value propagated to onChange
 * This separation allows the parent to receive clean option values
 * while the input shows human-readable labels.
 */
export const Combobox: React.FC<ComboboxProps> = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  disabled = false,
  clearable = false,
}) => {
  const id = useId();
  const inputId = `${id}-input`;
  const listId = `${id}-list`;
  const labelId = `${id}-label`;

  // Initialize inputText from value — find matching option label
  const initLabel = options.find((o) => o.value === value)?.label ?? value;
  const [inputText, setInputText] = useState(initLabel);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep inputText in sync when external value changes (controlled updates)
  useEffect(() => {
    const matchedLabel = options.find((o) => o.value === value)?.label ?? value;
    setInputText(matchedLabel);
  }, [value, options]);

  // Filter by what the user typed — case-insensitive
  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(inputText.toLowerCase())
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  // Outside-click to close
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
    const text = e.target.value;
    setInputText(text);
    onChange(text); // propagate free text as value too
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
      if (activeIndex >= 0 && filtered[activeIndex]) {
        selectOption(filtered[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      close();
    }
  };

  const selectOption = (opt: ComboboxOption) => {
    setInputText(opt.label);
    onChange(opt.value);
    close();
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setInputText('');
    onChange('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const activeDescendant =
    isOpen && activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined;

  const showDropdown = isOpen && filtered.length > 0;
  const showClear = clearable && inputText.length > 0 && !disabled;

  return (
    <div className={styles['cx-root']} ref={rootRef}>
      {label && (
        <label id={labelId} htmlFor={inputId} className={styles['cx-label']}>
          {label}
        </label>
      )}

      <div className={styles['cx-field']}>
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
          value={inputText}
          onChange={handleInputChange}
          onFocus={() => inputText.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          className={[
            styles['cx-input'],
            showClear ? styles['cx-input--has-clear'] : '',
            disabled ? styles['cx-input--disabled'] : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />

        {/* Dropdown chevron */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          disabled={disabled}
          onClick={() => (isOpen ? close() : setIsOpen(true))}
          className={styles['cx-chevron-btn']}
        >
          <svg
            className={[
              styles['cx-chevron'],
              isOpen ? styles['cx-chevron--open'] : '',
            ]
              .filter(Boolean)
              .join(' ')}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
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

        {/* Clear button — only when clearable and has value */}
        {showClear && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpiar selección"
            className={styles['cx-clear']}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 1L11 11M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      {showDropdown && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className={styles['cx-list']}
        >
          {filtered.map((opt, idx) => (
            <li
              key={opt.value}
              id={`${listId}-option-${idx}`}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => selectOption(opt)}
              className={[
                styles['cx-option'],
                opt.value === value ? styles['cx-option--selected'] : '',
                idx === activeIndex ? styles['cx-option--active'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {isOpen && filtered.length === 0 && inputText.length > 0 && (
        <div className={styles['cx-empty']} role="status">
          Sin resultados para "{inputText}"
        </div>
      )}
    </div>
  );
};
