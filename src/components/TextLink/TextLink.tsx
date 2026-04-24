import React from 'react';
import styles from './TextLink.module.css';

export type TextLinkTone =
  | 'Default'
  | 'Neutral strong'
  | 'Neutral weak'
  | 'Destructive'
  | 'Inverse strong'
  | 'Inverse weak';

export type TextLinkSize = 'Small' | 'Tiny';
export type TextLinkWeight = 'Bold' | 'Regular';

export interface TextLinkProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  tone?: TextLinkTone;
  size?: TextLinkSize;
  weight?: TextLinkWeight;
  underline?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

const toneClass: Record<TextLinkTone, string> = {
  'Default': styles['tl-root--default'],
  'Neutral strong': styles['tl-root--neutral-strong'],
  'Neutral weak': styles['tl-root--neutral-weak'],
  'Destructive': styles['tl-root--destructive'],
  'Inverse strong': styles['tl-root--inverse-strong'],
  'Inverse weak': styles['tl-root--inverse-weak'],
};

export const TextLink = React.forwardRef<
  HTMLAnchorElement & HTMLButtonElement,
  TextLinkProps
>(
  (
    {
      children,
      href,
      onClick,
      tone = 'Default',
      size = 'Small',
      weight = 'Bold',
      underline = true,
      disabled = false,
      iconLeft,
      iconRight,
      className = '',
    },
    ref,
  ) => {
    const classes = [
      styles['tl-root'],
      toneClass[tone],
      size === 'Small' ? styles['tl-root--small'] : styles['tl-root--tiny'],
      weight === 'Bold' ? styles['tl-root--bold'] : styles['tl-root--regular'],
      underline ? styles['tl-root--underline'] : '',
      disabled ? styles['tl-root--disabled'] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {iconLeft && <span className={styles['tl-icon']}>{iconLeft}</span>}
        {children}
        {iconRight && <span className={styles['tl-icon']}>{iconRight}</span>}
      </>
    );

    if (disabled) {
      return (
        <span className={classes} aria-disabled="true">
          {content}
        </span>
      );
    }

    if (href) {
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} onClick={onClick} className={classes}>
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        className={classes}
      >
        {content}
      </button>
    );
  },
);

TextLink.displayName = 'TextLink';

export default TextLink;
