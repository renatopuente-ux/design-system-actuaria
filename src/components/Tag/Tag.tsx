import React from 'react';
import styles from './Tag.module.css';

export interface TagProps {
  label: string;
  /** Called when the remove (×) button is clicked. Renders button only when provided. */
  onRemove?: () => void;
  /** Overrides the background color. Accepts any valid CSS color value. */
  color?: string;
  /** Optional icon rendered to the left of the label */
  icon?: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ label, onRemove, color, icon }) => {
  return (
    <span
      className={styles['tag-root']}
      style={color ? { backgroundColor: color } : undefined}
    >
      {icon && (
        <span className={styles['tag-icon']} aria-hidden="true">
          {icon}
        </span>
      )}

      <span className={styles['tag-label']}>{label}</span>

      {onRemove && (
        <button
          type="button"
          className={styles['tag-remove']}
          onClick={onRemove}
          aria-label={`Eliminar etiqueta ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
};

export default Tag;
