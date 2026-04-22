import React, { useId, useState, useRef, useEffect } from 'react';
import styles from './Accordion.module.css';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

// Chevron rotates 180° via CSS when open — no inline style needed
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`${styles['acc-chevron']} ${open ? styles['acc-chevron--open'] : ''}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface AccordionPanelProps {
  id: string;
  headerId: string;
  open: boolean;
  children: React.ReactNode;
}

// Uses max-height transition: 0 → measured scrollHeight for smooth open/close
function AccordionPanel({ id, headerId, open, children }: AccordionPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      el.style.maxHeight = `${el.scrollHeight}px`;
    } else {
      el.style.maxHeight = '0px';
    }
  }, [open]);

  return (
    <div
      id={id}
      role="region"
      aria-labelledby={headerId}
      className={`${styles['acc-panel']} ${open ? styles['acc-panel--open'] : ''}`}
      ref={ref}
    >
      <div className={styles['acc-panel__inner']}>{children}</div>
    </div>
  );
}

export function Accordion({ items, allowMultiple = false, defaultOpen = [] }: AccordionProps) {
  const uid = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={styles['acc-root']} role="list">
      {items.map((item, index) => {
        const isOpen = openIds.has(item.id);
        const headerId = `${uid}-header-${item.id}`;
        const panelId = `${uid}-panel-${item.id}`;
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.id}
            className={`${styles['acc-item']} ${isLast ? styles['acc-item--last'] : ''}`}
            role="listitem"
          >
            <h3 className={styles['acc-item__heading']}>
              <button
                id={headerId}
                className={styles['acc-item__trigger']}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                type="button"
              >
                <span className={styles['acc-item__title']}>{item.title}</span>
                <ChevronIcon open={isOpen} />
              </button>
            </h3>
            <AccordionPanel id={panelId} headerId={headerId} open={isOpen}>
              {item.content}
            </AccordionPanel>
          </div>
        );
      })}
    </div>
  );
}
