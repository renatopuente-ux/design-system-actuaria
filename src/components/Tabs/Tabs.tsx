import React, { useId, useState, useRef, useCallback } from 'react';
import styles from './Tabs.module.css';
import { TabItem } from '../TabItem/TabItem';

export interface TabOption {
  id: string;
  label: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabOption[];
  defaultTab?: string;
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, defaultTab, value, onChange, className = '' }: TabsProps) {
  const uid = useId();
  const [internalActiveId, setInternalActiveId] = useState<string>(
    defaultTab ?? tabs.find((t) => !t.disabled)?.id ?? '',
  );
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const activeId = value ?? internalActiveId;

  const activate = useCallback(
    (id: string) => {
      setInternalActiveId(id);
      onChange?.(id);
    },
    [onChange],
  );

  const enabledTabs = tabs.filter((t) => !t.disabled);

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, id: string) {
    const currentIndex = enabledTabs.findIndex((t) => t.id === id);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = enabledTabs[(currentIndex + 1) % enabledTabs.length];
      activate(next.id);
      tabRefs.current.get(next.id)?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = enabledTabs[(currentIndex - 1 + enabledTabs.length) % enabledTabs.length];
      activate(prev.id);
      tabRefs.current.get(prev.id)?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      const first = enabledTabs[0];
      activate(first.id);
      tabRefs.current.get(first.id)?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = enabledTabs[enabledTabs.length - 1];
      activate(last.id);
      tabRefs.current.get(last.id)?.focus();
    }
  }

  const activeTab = tabs.find((t) => t.id === activeId);

  return (
    <div className={[styles['tabs-root'], className].filter(Boolean).join(' ')}>
      <div role="tablist" className={styles['tabs-list']} aria-label="Secciones">
        {tabs.map((tab) => {
          const tabId = `${uid}-tab-${tab.id}`;
          const panelId = `${uid}-panel-${tab.id}`;
          const isSelected = tab.id === activeId;

          return (
            <TabItem
              key={tab.id}
              id={tabId}
              label={tab.label}
              selected={isSelected}
              disabled={tab.disabled}
              icon={tab.icon}
              badge={tab.badge}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => !tab.disabled && activate(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
                else tabRefs.current.delete(tab.id);
              }}
            />
          );
        })}
      </div>

      {activeTab?.content != null && (
        <div
          id={`${uid}-panel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${activeTab.id}`}
          className={styles['tabs-panel']}
          tabIndex={0}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}

export default Tabs;
