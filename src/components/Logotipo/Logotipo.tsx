import React from 'react';
import styles from './Logotipo.module.css';

export type LogotipoVariant =
  | 'Color'
  | 'Negativo'
  | 'Black'
  | 'ColorAlt'
  | 'ActuariaPlus'
  | 'ActuariaPlusNegativo'
  | 'IsoActuariaPlusColor'
  | 'IsoActuariaPlusNegativo';

export interface LogotipoProps {
  variant?: LogotipoVariant;
  /** Override width. Height scales proportionally. Default: auto */
  width?: number | string;
  className?: string;
  alt?: string;
}

const VARIANT_ASSET: Record<LogotipoVariant, string> = {
  Color: '/logos/logo-color.png',
  Negativo: '/logos/logo-negativo.png',
  Black: '/logos/logo-black.png',
  ColorAlt: '/logos/logo-color-alt.png',
  ActuariaPlus: '/logos/logo-actuaria-plus.png',
  ActuariaPlusNegativo: '/logos/logo-actuaria-plus-negativo.png',
  IsoActuariaPlusColor: '/logos/logo-iso-plus-color.png',
  IsoActuariaPlusNegativo: '/logos/logo-iso-plus-negativo.png',
};

const VARIANT_ALT: Record<LogotipoVariant, string> = {
  Color: 'Actuaria Consultores',
  Negativo: 'Actuaria Consultores',
  Black: 'Actuaria Consultores',
  ColorAlt: 'Actuaria Consultores',
  ActuariaPlus: 'Actuaria Plus',
  ActuariaPlusNegativo: 'Actuaria Plus',
  IsoActuariaPlusColor: 'Actuaria Plus',
  IsoActuariaPlusNegativo: 'Actuaria Plus',
};

export const Logotipo: React.FC<LogotipoProps> = ({
  variant = 'Color',
  width,
  className,
  alt,
}) => {
  const src = VARIANT_ASSET[variant];
  const altText = alt ?? VARIANT_ALT[variant];
  const widthStyle: React.CSSProperties = width !== undefined ? { width } : {};

  return (
    <img
      src={src}
      alt={altText}
      className={`${styles['lo-root']}${className ? ` ${className}` : ''}`}
      style={widthStyle}
    />
  );
};

export default Logotipo;
