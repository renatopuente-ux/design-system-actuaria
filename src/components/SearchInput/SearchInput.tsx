import React, { useId } from 'react';
import styles from './SearchInput.module.css';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onClear?: () => void;
  label?: string;
  className?: string;
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  disabled = false,
  onClear,
  label,
  className = '',
}) => {
  const id = useId();

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <div className={[styles.si, className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={id} className={styles.si__label}>
          {label}
        </label>
      )}
      <div className={[styles.si__wrapper, disabled ? styles['si__wrapper--disabled'] : ''].filter(Boolean).join(' ')}>
        <span className={styles.si__icon}>
          <SearchIcon />
        </span>
        <input
          id={id}
          type="search"
          className={styles.si__input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={label ?? placeholder}
        />
        {value && !disabled && (
          <button
            type="button"
            className={styles.si__clear}
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            <ClearIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
