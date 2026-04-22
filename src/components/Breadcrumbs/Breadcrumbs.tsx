import React from 'react';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

// Default separator is a forward-slash rendered in --text-weak
function DefaultSeparator() {
  return (
    <span className={styles['brc-separator']} aria-hidden="true">
      /
    </span>
  );
}

export function Breadcrumbs({ items, separator }: BreadcrumbsProps) {
  const sep = separator ?? <DefaultSeparator />;

  return (
    <nav aria-label="Breadcrumb" className={styles['brc-root']}>
      <ol className={styles['brc-list']}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className={styles['brc-item']}>
              {isLast ? (
                // Current page: no link, aria-current for screen readers
                <span
                  className={styles['brc-item__current']}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? '#'}
                  className={styles['brc-item__link']}
                >
                  {item.label}
                </a>
              )}
              {!isLast && sep}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
