import React, { useState } from 'react';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  message,
  dismissible = false,
  onDismiss,
  icon,
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div
      className={`${styles['alt-root']} ${styles[`alt-root--${variant}`]}`}
      role="alert"
      aria-live="polite"
    >
      {icon && <span className={styles['alt-icon']} aria-hidden="true">{icon}</span>}

      <div className={styles['alt-body']}>
        {title && <p className={styles['alt-title']}>{title}</p>}
        <p className={styles['alt-message']}>{message}</p>
      </div>

      {dismissible && (
        <button
          className={styles['alt-dismiss']}
          onClick={handleDismiss}
          aria-label="Cerrar alerta"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
};
