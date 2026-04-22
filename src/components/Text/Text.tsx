import React from 'react';
import styles from './Text.module.css';

export type TextVariant =
  | 'heading1'
  | 'heading3'
  | 'heading4'
  | 'body'
  | 'bodyBold'
  | 'tiny'
  | 'uppercase'
  | 'textLink';

export interface TextProps {
  variant?: TextVariant;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  color?: string;
  href?: string;
  className?: string;
}

const defaultTags: Record<TextVariant, keyof JSX.IntrinsicElements> = {
  heading1:  'h1',
  heading3:  'h3',
  heading4:  'h4',
  body:      'p',
  bodyBold:  'p',
  tiny:      'span',
  uppercase: 'span',
  textLink:  'a',
};

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  as,
  children,
  align,
  color,
  href,
  className = '',
}) => {
  const Tag = (as ?? defaultTags[variant]) as React.ElementType;
  const extraProps: Record<string, unknown> = {};
  if (Tag === 'a') extraProps.href = href ?? '#';

  return (
    <Tag
      className={[
        styles.tx,
        styles[`tx--${variant}`],
        align ? styles[`tx--${align}`] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={color ? { color } : undefined}
      {...extraProps}
    >
      {children}
    </Tag>
  );
};

export default Text;
