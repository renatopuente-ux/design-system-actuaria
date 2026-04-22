import React from 'react';
import styles from './TextBlock.module.css';

export interface TextBlockProps {
  align?: 'left' | 'center';
  heading?: boolean;
  icon?: boolean;
  secondaryText?: boolean;
  textLink?: boolean;
  headingText?: string;
  bodyText?: string;
  linkText?: string;
  linkHref?: string;
  iconSrc?: string;
  iconAlt?: string;
  iconNode?: React.ReactNode;
  className?: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  align = 'left',
  heading = true,
  icon = true,
  secondaryText = true,
  textLink = true,
  headingText = 'Título del bloque',
  bodyText = 'Descripción del contenido de este bloque de texto.',
  linkText = 'Ver más',
  linkHref = '#',
  iconSrc,
  iconAlt = '',
  iconNode,
  className = '',
}) => {
  return (
    <div
      className={[
        styles.tb,
        align === 'center' ? styles['tb--center'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon && (
        <div className={styles.tb__icon_container}>
          {iconNode ?? (
            iconSrc ? (
              <img src={iconSrc} alt={iconAlt} className={styles.tb__icon_img} />
            ) : (
              <svg className={styles.tb__icon_default} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )
          )}
        </div>
      )}
      <div className={styles.tb__text}>
        {heading && <h3 className={styles.tb__heading}>{headingText}</h3>}
        {secondaryText && <p className={styles.tb__body}>{bodyText}</p>}
      </div>
      {textLink && (
        <a href={linkHref} className={styles.tb__link}>
          {linkText}
        </a>
      )}
    </div>
  );
};

export default TextBlock;
