import React from 'react';
import styles from './Text.module.css';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'uppercase'
  | 'small'
  | 'tiny'
  | 'mini'
  | 'micro'
  | 'dot';

export interface TextProps {
  variant?: TextVariant;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const defaultTags: Record<TextVariant, keyof JSX.IntrinsicElements> = {
  h1:        'h1',
  h2:        'h2',
  h3:        'h3',
  h4:        'h4',
  uppercase: 'span',
  small:     'p',
  tiny:      'p',
  mini:      'p',
  micro:     'p',
  dot:       'span',
};

export const Text: React.FC<TextProps> = ({
  variant = 'small',
  as,
  children,
  align,
  className = '',
}) => {
  const Tag = (as ?? defaultTags[variant]) as React.ElementType;

  return (
    <Tag
      className={[
        styles['tx'],
        styles[`tx--${variant}`],
        align ? styles[`tx--${align}`] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
};

export default Text;
