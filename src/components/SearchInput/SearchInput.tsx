import React, { useId } from 'react';
import styles from './SearchInput.module.css';

export type SearchInputSize = 'Medium' | 'Small';
export type SearchInputType = 'Default' | 'Button';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  placeholder?: string;
  size?: SearchInputSize;
  type?: SearchInputType;
  disabled?: boolean;
  /** Accessible label */
  label?: string;
  searchLabel?: string;
  className?: string;
}

const SearchIcon24 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SearchIcon16 = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ClearIcon24 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ClearIcon16 = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = 'Buscar...',
  size = 'Medium',
  type = 'Default',
  disabled = false,
  label,
  searchLabel = 'Buscar',
  className = '',
}) => {
  const id = useId();
  const isSmall = size === 'Small';
  const hasButton = type === 'Button';

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch?.();
  };

  return (
    <div
      className={[
        styles['si-root'],
        hasButton ? styles['si-root--button'] : '',
        isSmall ? styles['si-root--small'] : styles['si-root--medium'],
        disabled ? styles['si-root--disabled'] : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Search field */}
      <div className={styles['si-field']}>
        <span className={styles['si-search-icon']}>
          {isSmall ? <SearchIcon16 /> : <SearchIcon24 />}
        </span>
        <input
          id={id}
          type="search"
          className={styles['si-input']}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={label ?? placeholder}
        />
        {value && !disabled && (
          <button
            type="button"
            className={styles['si-clear']}
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            {isSmall ? <ClearIcon16 /> : <ClearIcon24 />}
          </button>
        )}
      </div>

      {/* Button CTA (type=Button) */}
      {hasButton && (
        <button
          type="button"
          className={[styles['si-btn'], disabled ? styles['si-btn--disabled'] : ''].filter(Boolean).join(' ')}
          onClick={onSearch}
          disabled={disabled}
        >
          {searchLabel}
        </button>
      )}
    </div>
  );
};

export default SearchInput;
