import React, { useId, useState } from 'react';
import styles from './NavigationSide.module.css';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: NavItem[];
}

export interface NavigationSideProps {
  items: NavItem[];
  activeId?: string;
  collapsed?: boolean;
}

interface NavItemRowProps {
  item: NavItem;
  activeId: string | undefined;
  collapsed: boolean;
  depth: number;
}

function NavItemRow({ item, activeId, collapsed, depth }: NavItemRowProps) {
  const uid = useId();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.id === activeId;
  // Auto-expand the branch that contains the active item
  const containsActive = item.children?.some((c) => c.id === activeId) ?? false;
  const [expanded, setExpanded] = useState(containsActive);

  const Tag = item.href ? 'a' : 'button';

  const rowProps = item.href
    ? { href: item.href }
    : { type: 'button' as const, onClick: hasChildren ? () => setExpanded((v) => !v) : undefined };

  return (
    <>
      <li className={styles['ns-item']}>
        <Tag
          {...rowProps}
          className={`${styles['ns-item__row']} ${isActive ? styles['ns-item__row--active'] : ''}`}
          aria-current={isActive ? 'page' : undefined}
          aria-expanded={hasChildren ? expanded : undefined}
          aria-controls={hasChildren ? `${uid}-sub` : undefined}
          style={depth > 0 ? { paddingLeft: `calc(var(--ns-indent-base) + ${depth} * var(--ns-indent-step))` } : undefined}
        >
          {item.icon && (
            <span className={styles['ns-item__icon']} aria-hidden="true">
              {item.icon}
            </span>
          )}
          {!collapsed && (
            <span className={styles['ns-item__label']}>{item.label}</span>
          )}
          {!collapsed && hasChildren && (
            <svg
              className={`${styles['ns-chevron']} ${expanded ? styles['ns-chevron--open'] : ''}`}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M3.5 5.25l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </Tag>
      </li>

      {hasChildren && expanded && !collapsed && (
        <li id={`${uid}-sub`} role="none">
          <ul className={styles['ns-sublist']} role="list">
            {item.children!.map((child) => (
              <NavItemRow
                key={child.id}
                item={child}
                activeId={activeId}
                collapsed={collapsed}
                depth={depth + 1}
              />
            ))}
          </ul>
        </li>
      )}
    </>
  );
}

export function NavigationSide({ items, activeId, collapsed = false }: NavigationSideProps) {
  return (
    <nav
      className={`${styles['ns-root']} ${collapsed ? styles['ns-root--collapsed'] : ''}`}
      aria-label="Navegación principal"
    >
      <ul className={styles['ns-list']} role="list">
        {items.map((item) => (
          <NavItemRow
            key={item.id}
            item={item}
            activeId={activeId}
            collapsed={collapsed}
            depth={0}
          />
        ))}
      </ul>
    </nav>
  );
}
