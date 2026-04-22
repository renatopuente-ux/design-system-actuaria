import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

const DAYS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function formatDate(d: Date): string {
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = 'dd/mm/aaaa',
  disabled = false,
  label,
}) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ?? new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('keydown', esc); };
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isDisabled = (day: number) => {
    const d = new Date(year, month, day);
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  };

  const handleSelect = (day: number) => {
    if (isDisabled(day)) return;
    const selected = new Date(year, month, day);
    onChange(selected);
    setOpen(false);
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div ref={ref} className={styles.dp}>
      {label && <label htmlFor={id} className={styles.dp__label}>{label}</label>}
      <button
        id={id}
        type="button"
        className={[styles.dp__input, disabled ? styles['dp__input--disabled'] : ''].filter(Boolean).join(' ')}
        onClick={() => !disabled && setOpen((p) => !p)}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={value ? styles.dp__value : styles.dp__placeholder}>
          {value ? formatDate(value) : placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div className={styles.dp__calendar} role="dialog" aria-label="Seleccionar fecha">
          <div className={styles.dp__nav}>
            <button type="button" onClick={prevMonth} className={styles.dp__navbtn} aria-label="Mes anterior">‹</button>
            <span className={styles.dp__monthyear}>{MONTHS[month]} {year}</span>
            <button type="button" onClick={nextMonth} className={styles.dp__navbtn} aria-label="Mes siguiente">›</button>
          </div>
          <div className={styles.dp__grid}>
            {DAYS.map((d) => <div key={d} className={styles.dp__dayname}>{d}</div>)}
            {cells.map((day, i) =>
              day === null ? (
                <div key={`empty-${i}`} />
              ) : (
                <button
                  key={day}
                  type="button"
                  className={[
                    styles.dp__day,
                    value && isSameDay(new Date(year, month, day), value) ? styles['dp__day--selected'] : '',
                    isSameDay(new Date(year, month, day), new Date()) ? styles['dp__day--today'] : '',
                    isDisabled(day) ? styles['dp__day--disabled'] : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleSelect(day)}
                  disabled={isDisabled(day)}
                  aria-label={`${day} de ${MONTHS[month]} de ${year}`}
                  aria-pressed={value ? isSameDay(new Date(year, month, day), value) : false}
                >
                  {day}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
