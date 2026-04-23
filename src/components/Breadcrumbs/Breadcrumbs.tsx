/* ═══════════════════════════════════════════════════════════════
   Breadcrumbs — Actuaria Design System
   Figma node: 4993:5859  ·  fileKey: N1wh3u4sX3UGyUU5oWOaz6
   ═══════════════════════════════════════════════════════════════ */
import React from 'react';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /**
   * Collapsed: renders first / … / last.
   * Default: renders all items.
   */
  collapsed?: boolean;
  /** Called when the "…" button is clicked in collapsed mode */
  onExpandCollapsed?: () => void;
  className?: string;
}

function Separator() {
  return (
    <span className={styles['brc-separator']} aria-hidden="true">/</span>
  );
}

export function Breadcrumbs({
  items,
  collapsed = false,
  onExpandCollapsed,
  className,
}: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const renderItem = (item: BreadcrumbItem, isCurrent: boolean) => {
    if (isCurrent) {
      return (
        <span className={styles['brc-link']} aria-current="page">
          {item.label}
        </span>
      );
    }
    if (item.href || item.onClick) {
      return (
        <a
          href={item.href ?? '#'}
          onClick={item.onClick}
          className={styles['brc-link']}
        >
          {item.label}
        </a>
      );
    }
    return <span className={styles['brc-link']}>{item.label}</span>;
  };

  // ── Collapsed: first / … / last ────────────────────────────
  if (collapsed && items.length > 2) {
    const first = items[0];
    const last  = items[items.length - 1];
    return (
      <nav aria-label="Breadcrumb" className={[styles['brc-root'], className].filter(Boolean).join(' ')}>
        <ol className={styles['brc-list']}>
          <li className={styles['brc-item']}>
            {renderItem(first, false)}
          </li>
          <li className={styles['brc-item']}>
            <Separator />
            <button
              type="button"
              className={styles['brc-collapsed-btn']}
              onClick={onExpandCollapsed}
              aria-label="Mostrar ruta completa"
            >
              …
            </button>
          </li>
          <li className={styles['brc-item']}>
            <Separator />
            {renderItem(last, true)}
          </li>
        </ol>
      </nav>
    );
  }

  // ── Default: all items ─────────────────────────────────────
  return (
    <nav aria-label="Breadcrumb" className={[styles['brc-root'], className].filter(Boolean).join(' ')}>
      <ol className={styles['brc-list']}>
        {items.map((item, idx) => {
          const isFirst   = idx === 0;
          const isCurrent = idx === items.length - 1;
          return (
            <li key={idx} className={styles['brc-item']}>
              {!isFirst && <Separator />}
              {renderItem(item, isCurrent)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
