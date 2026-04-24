import React from 'react';
import styles from './TextBlock.module.css';

const DiamondIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles['tb__icon-default']}>
    <rect
      x="12" y="3"
      width="12.73" height="12.73"
      rx="1"
      transform="rotate(45 12 3)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export interface TextBlockProps {
  align?: 'Left' | 'Centre';
  heading?: boolean;
  icon?: boolean;
  secondaryText?: boolean;
  textLink?: boolean;
  headingText?: string;
  bodyText?: string;
  linkText?: string;
  linkHref?: string;
  iconNode?: React.ReactNode;
  className?: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  align = 'Left',
  heading = true,
  icon = true,
  secondaryText = true,
  textLink = true,
  headingText = 'Heading',
  bodyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus blandit euismod.',
  linkText = 'Label',
  linkHref,
  iconNode,
  className = '',
}) => {
  const isCentre = align === 'Centre';

  return (
    <div
      className={[
        styles['tb-root'],
        isCentre ? styles['tb-root--centre'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon && (
        <div className={styles['tb-icon-wrap']}>
          {iconNode ?? <DiamondIcon />}
        </div>
      )}

      <div className={styles['tb-text']}>
        {heading && <p className={styles['tb-heading']}>{headingText}</p>}
        {secondaryText && <p className={styles['tb-body']}>{bodyText}</p>}
      </div>

      {textLink && (
        <a
          href={linkHref}
          className={styles['tb-link']}
        >
          {linkText}
        </a>
      )}
    </div>
  );
};

export default TextBlock;
