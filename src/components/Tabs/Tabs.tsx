import React, { useId, useState, useRef, useCallback } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (id: string) => void;
}

export function Tabs({ tabs, defaultTab, onChange }: TabsProps) {
  const uid = useId();
  const [activeId, setActiveId] = useState<string>(defaultTab ?? tabs[0]?.id ?? '');
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const activate = useCallback(
    (id: string) => {
      setActiveId(id);
      onChange?.(id);
    },
    [onChange],
  );

  // Keyboard navigation: ArrowLeft / ArrowRight cycle through tabs
  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = tabs[(index + 1) % tabs.length];
      activate(next.id);
      tabRefs.current.get(next.id)?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = tabs[(index - 1 + tabs.length) % tabs.length];
      activate(prev.id);
      tabRefs.current.get(prev.id)?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      activate(tabs[0].id);
      tabRefs.current.get(tabs[0].id)?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = tabs[tabs.length - 1];
      activate(last.id);
      tabRefs.current.get(last.id)?.focus();
    }
  }

  const activeTab = tabs.find((t) => t.id === activeId);

  return (
    <div className={styles['tb-root']}>
      {/* Tab bar */}
      <div role="tablist" className={styles['tb-tablist']} aria-label="Secciones">
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeId;
          const tabId = `${uid}-tab-${tab.id}`;
          const panelId = `${uid}-panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              className={`${styles['tb-tab']} ${isActive ? styles['tb-tab--active'] : ''}`}
              onClick={() => activate(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
                else tabRefs.current.delete(tab.id);
              }}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab panel */}
      {activeTab && (
        <div
          id={`${uid}-panel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${activeTab.id}`}
          className={styles['tb-panel']}
          tabIndex={0}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
