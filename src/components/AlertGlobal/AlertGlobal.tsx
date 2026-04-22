import React from 'react';
import styles from './AlertGlobal.module.css';

export type AlertGlobalVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertGlobalAction {
  label: string;
  onClick: () => void;
}

export interface AlertGlobalProps {
  variant: AlertGlobalVariant;
  message: string;
  action?: AlertGlobalAction;
  onDismiss?: () => void;
}

export const AlertGlobal: React.FC<AlertGlobalProps> = ({
  variant,
  message,
  action,
  onDismiss,
}) => {
  return (
    <div
      className={`${styles['ag-root']} ${styles[`ag-root--${variant}`]}`}
      role="status"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className={styles['ag-content']}>
        <p className={styles['ag-message']}>{message}</p>

        {action && (
          <button
            className={styles['ag-action']}
            onClick={action.onClick}
            type="button"
          >
            {action.label}
          </button>
        )}
      </div>

      {onDismiss && (
        <button
          className={styles['ag-dismiss']}
          onClick={onDismiss}
          aria-label="Cerrar notificación"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
};
