import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  hint?: boolean;
  optional?: boolean;
  required?: boolean;
  disabled?: boolean;
  valid?: boolean;
  errorMessage?: string;
  className?: string;
}

const DAYS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

function formatDate(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date());
}

// ─── CalendarDate cell ────────────────────────────────────────────────────────

interface CalendarDateProps {
  day: number;
  year: number;
  month: number;
  selected: boolean;
  today: boolean;
  disabled: boolean;
  onSelect: (day: number) => void;
}

const CalendarDate: React.FC<CalendarDateProps> = ({
  day,
  year,
  month,
  selected,
  today,
  disabled,
  onSelect,
}) => {
  const cellClasses = [
    styles.cell,
    selected ? styles['cell--selected'] : '',
    disabled ? styles['cell--disabled'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={cellClasses}
      onClick={() => !disabled && onSelect(day)}
      disabled={disabled}
      aria-label={`${day} de ${MONTHS[month]} de ${year}`}
      aria-pressed={selected}
    >
      {day}
      {today && (
        <span
          className={[styles.cell__dot, selected ? styles['cell__dot--selected'] : ''].filter(Boolean).join(' ')}
          aria-hidden="true"
        />
      )}
    </button>
  );
};

// ─── _Calendar panel ─────────────────────────────────────────────────────────

interface CalendarProps {
  viewDate: Date;
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelect: (day: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  viewDate,
  value,
  minDate,
  maxDate,
  onPrevMonth,
  onNextMonth,
  onSelect,
}) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isDayDisabled = (day: number): boolean => {
    const d = new Date(year, month, day);
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to complete last row (6 rows × 7 = 42 total cells)
  while (cells.length < 42) cells.push(null);

  return (
    <div className={styles.calendar} role="dialog" aria-label="Seleccionar fecha">
      {/* Header */}
      <div className={styles.calendar__header}>
        <button
          type="button"
          className={styles.calendar__arrow}
          onClick={onPrevMonth}
          aria-label="Mes anterior"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className={styles.calendar__title}>
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          className={styles.calendar__arrow}
          onClick={onNextMonth}
          aria-label="Mes siguiente"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Day name headers */}
      <div className={styles.calendar__grid}>
        {DAYS.map((d) => (
          <div key={d} className={styles.calendar__dayname}>
            {d}
          </div>
        ))}

        {/* Day cells */}
        {cells.map((day, i) =>
          day === null ? (
            <div key={`empty-${i}`} className={styles.cell} aria-hidden="true" />
          ) : (
            <CalendarDate
              key={day}
              day={day}
              year={year}
              month={month}
              selected={value ? isSameDay(new Date(year, month, day), value) : false}
              today={isToday(new Date(year, month, day))}
              disabled={isDayDisabled(day)}
              onSelect={onSelect}
            />
          )
        )}
      </div>
    </div>
  );
};

// ─── DatePicker (field + popup) ───────────────────────────────────────────────

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  label,
  hint = false,
  optional = false,
  required = false,
  disabled = false,
  valid = true,
  errorMessage,
  className,
}) => {
  const id = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(value ?? new Date());
  const ref = useRef<HTMLDivElement>(null);

  // Sync viewDate when value changes externally
  useEffect(() => {
    if (value) setViewDate(value);
  }, [value]);

  // Outside-click + Escape close
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (day: number) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(selected);
    setOpen(false);
  };

  const fieldClasses = [
    styles.field,
    !valid ? styles['field--invalid'] : '',
    disabled ? styles['field--disabled'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const isInvalid = valid === false;

  return (
    <div
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(' ')}
    >
      {/* Label row */}
      {label && (
        <div className={styles.labelRow}>
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && (
              <span className={styles.label__suffix}> *</span>
            )}
            {optional && (
              <span className={styles.label__suffix}> (opcional)</span>
            )}
          </label>
          {hint && (
            <span className={styles.hint}>(dd/mm/yyyy)</span>
          )}
        </div>
      )}

      {/* Field trigger */}
      <button
        id={id}
        type="button"
        className={fieldClasses}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={isInvalid}
        aria-describedby={isInvalid && errorMessage ? errorId : undefined}
      >
        <span className={value ? styles.field__value : styles.field__placeholder}>
          {value ? formatDate(value) : 'dd/mm/yyyy'}
        </span>
        {/* Calendar icon 24×24 */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={styles.field__icon}
        >
          <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 2v3M16 2v3M3 9h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Error message */}
      {isInvalid && errorMessage && (
        <div id={errorId} className={styles.error}>
          <svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true" className={styles.error__icon}>
            <path d="M5.6 1h4.8L15 5.6v4.8L10.4 15H5.6L1 10.4V5.6L5.6 1z" fill="#c73a3a" />
            <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Calendar popup */}
      {open && (
        <Calendar
          viewDate={viewDate}
          value={value}
          minDate={minDate}
          maxDate={maxDate}
          onPrevMonth={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
          onNextMonth={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default DatePicker;
