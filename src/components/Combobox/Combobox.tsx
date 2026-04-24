import React, {
  useId,
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import styles from './Combobox.module.css';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  // Core (Single mode)
  value?: string;
  onChange?: (value: string) => void;
  // Multiple mode
  values?: string[];
  onChangeMultiple?: (values: string[]) => void;
  // Shared
  options: ComboboxOption[];
  type?: 'Single' | 'Multiple';
  placeholder?: string;
  label?: string;
  hint?: string;
  errorMessage?: string;
  disabled?: boolean;
  clearable?: boolean;
  optional?: boolean;
  required?: boolean;
  valid?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Internal sub-components
// ---------------------------------------------------------------------------

const ChevronIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2 2L14 14M14 2L2 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M5.6 1h4.8L15 5.6v4.8L10.4 15H5.6L1 10.4V5.6L5.6 1z" fill="#c73a3a" />
    <path
      d="M5.5 5.5l5 5M10.5 5.5l-5 5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/** Checkbox indicator for Multiple mode items */
const CheckboxIndicator = ({ checked }: { checked: boolean }) => (
  <span
    className={[
      styles['cx-checkbox'],
      checked ? styles['cx-checkbox--checked'] : '',
    ]
      .filter(Boolean)
      .join(' ')}
    aria-hidden="true"
  >
    {checked && (
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path
          d="M1 4L3.5 6.5L9 1"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </span>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * Combobox — hybrid of Select + free-text input.
 *
 * Single mode: user types to filter, clicks/keyboards to select one option.
 * Multiple mode: selected items render as chips inside the field; dropdown
 *   items show a checkbox indicator and toggle on click.
 *
 * Figma node: 6736:182931
 */
export const Combobox: React.FC<ComboboxProps> = ({
  value = '',
  onChange,
  values = [],
  onChangeMultiple,
  options,
  type = 'Single',
  placeholder,
  label,
  hint,
  errorMessage,
  disabled = false,
  clearable = false,
  optional = false,
  required = false,
  valid = true,
  className,
}) => {
  const isMultiple = type === 'Multiple';
  const id = useId();
  const inputId = `${id}-input`;
  const listId = `${id}-list`;
  const labelId = `${id}-label`;

  // Single mode: track the text in the input
  const initLabel = options.find((o) => o.value === value)?.label ?? value;
  const [inputText, setInputText] = useState(initLabel);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync Single mode input when external value changes
  useEffect(() => {
    if (!isMultiple) {
      const matchedLabel = options.find((o) => o.value === value)?.label ?? value;
      setInputText(matchedLabel);
    }
  }, [value, options, isMultiple]);

  // Filter options by typed text
  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(inputText.toLowerCase())
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  // Close on outside click
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

  // -------------------------------------------------------------------------
  // Single mode handlers
  // -------------------------------------------------------------------------

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    onChange?.(text);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const selectOption = (opt: ComboboxOption) => {
    setInputText(opt.label);
    onChange?.(opt.value);
    close();
    inputRef.current?.focus();
  };

  const handleClearSingle = () => {
    setInputText('');
    onChange?.('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // -------------------------------------------------------------------------
  // Multiple mode handlers
  // -------------------------------------------------------------------------

  const toggleOption = (opt: ComboboxOption) => {
    const next = values.includes(opt.value)
      ? values.filter((v) => v !== opt.value)
      : [...values, opt.value];
    onChangeMultiple?.(next);
    // Keep dropdown open and clear filter text so user can keep picking
    setInputText('');
    inputRef.current?.focus();
  };

  const removeChip = (val: string) => {
    onChangeMultiple?.(values.filter((v) => v !== val));
    inputRef.current?.focus();
  };

  const handleClearMultiple = () => {
    onChangeMultiple?.([]);
    setInputText('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // -------------------------------------------------------------------------
  // Keyboard navigation
  // -------------------------------------------------------------------------

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
        if (isMultiple) {
          toggleOption(filtered[activeIndex]);
        } else {
          selectOption(filtered[activeIndex]);
        }
      }
    } else if (e.key === 'Escape') {
      close();
    } else if (e.key === 'Backspace' && isMultiple && inputText === '' && values.length > 0) {
      // Remove last chip on backspace when input is empty
      onChangeMultiple?.(values.slice(0, -1));
    }
  };

  // -------------------------------------------------------------------------
  // Derived state
  // -------------------------------------------------------------------------

  const activeDescendant =
    isOpen && activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined;

  const showDropdown = isOpen && filtered.length > 0;
  const showEmpty = isOpen && filtered.length === 0 && inputText.length > 0;

  const showClear = !disabled && clearable && (
    isMultiple ? values.length > 0 : inputText.length > 0
  );

  const isInvalid = valid === false;
  const showError = isInvalid && !!errorMessage;
  const showHint = !showError && !!hint;

  // -------------------------------------------------------------------------
  // Field class composition
  // -------------------------------------------------------------------------

  const fieldClasses = [
    styles['cx-field'],
    isInvalid ? styles['cx-field--invalid'] : '',
    disabled ? styles['cx-field--disabled'] : '',
    isMultiple ? styles['cx-field--multiple'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    styles['cx-input'],
    isMultiple ? styles['cx-input--multiple'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div
      className={[styles['cx-root'], className].filter(Boolean).join(' ')}
      ref={rootRef}
    >
      {/* Label row */}
      {label && (
        <label id={labelId} htmlFor={inputId} className={styles['cx-label']}>
          <span className={styles['cx-label__text']}>{label}</span>
          {optional && (
            <span className={styles['cx-label__qualifier']}> (Opcional)</span>
          )}
          {required && (
            <span className={styles['cx-label__qualifier']}> (Requerido)</span>
          )}
        </label>
      )}

      {/* Field wrapper */}
      <div className={fieldClasses}>
        {/* Chips — Multiple mode only */}
        {isMultiple && values.length > 0 && (
          <div className={styles['cx-chips']}>
            {values.map((v) => {
              const opt = options.find((o) => o.value === v);
              return (
                <span key={v} className={styles['cx-chip']}>
                  {opt?.label ?? v}
                  <button
                    type="button"
                    className={styles['cx-chip__remove']}
                    onClick={() => removeChip(v)}
                    disabled={disabled}
                    aria-label={`Quitar ${opt?.label ?? v}`}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path
                        d="M1 1L9 9M9 1L1 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* Text input */}
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
          aria-invalid={isInvalid}
          value={inputText}
          onChange={handleInputChange}
          onFocus={() => {
            if (isMultiple || inputText.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={isMultiple && values.length > 0 ? '' : placeholder}
          disabled={disabled}
          autoComplete="off"
          className={inputClasses}
        />

        {/* Right-side controls */}
        <div className={styles['cx-controls']}>
          {showClear && (
            <>
              <button
                type="button"
                onClick={isMultiple ? handleClearMultiple : handleClearSingle}
                aria-label="Limpiar selección"
                disabled={disabled}
                className={styles['cx-clear']}
              >
                <ClearIcon />
              </button>
              <span className={styles['cx-divider']} aria-hidden="true" />
            </>
          )}

          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            disabled={disabled}
            onClick={() => (isOpen ? close() : setIsOpen(true))}
            className={styles['cx-chevron-btn']}
          >
            <span
              className={[
                styles['cx-chevron'],
                isOpen ? styles['cx-chevron--open'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <ChevronIcon />
            </span>
          </button>
        </div>

        {/* Dropdown list */}
        {showDropdown && (
          <ul
            id={listId}
            role="listbox"
            aria-label={label}
            aria-multiselectable={isMultiple}
            className={styles['cx-list']}
          >
            {filtered.map((opt, idx) => {
              const isSelected = isMultiple
                ? values.includes(opt.value)
                : opt.value === value;
              return (
                <li
                  key={opt.value}
                  id={`${listId}-option-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => e.preventDefault()} // prevent input blur
                  onClick={() => (isMultiple ? toggleOption(opt) : selectOption(opt))}
                  className={[
                    styles['cx-option'],
                    isSelected ? styles['cx-option--selected'] : '',
                    idx === activeIndex ? styles['cx-option--active'] : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {isMultiple && <CheckboxIndicator checked={isSelected} />}
                  {opt.label}
                </li>
              );
            })}
          </ul>
        )}

        {/* Empty state */}
        {showEmpty && (
          <div className={styles['cx-empty']} role="status">
            Sin resultados para &ldquo;{inputText}&rdquo;
          </div>
        )}
      </div>

      {/* Hint text */}
      {showHint && <p className={styles['cx-hint']}>{hint}</p>}

      {/* Error message */}
      {showError && (
        <p className={styles['cx-error']}>
          <ErrorIcon />
          {errorMessage}
        </p>
      )}
    </div>
  );
};
