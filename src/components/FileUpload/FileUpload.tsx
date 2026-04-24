import React, { useCallback, useRef, useState } from 'react';
import styles from './FileUpload.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FileUploadFile {
  id: string;
  name: string;
  size: number;        // bytes
  progress?: number;  // 0–100. undefined or 100 = uploaded
  href?: string;      // if provided, filename becomes a link when uploaded
}

export interface FileUploadProps {
  // Drop zone
  accept?: string;
  multiple?: boolean;
  maxSize?: number;         // bytes — files over this are rejected
  // Label row
  label?: string;
  hint?: boolean;           // shows format/size hint below label
  optional?: boolean;       // appends " (opcional)" to label
  required?: boolean;       // appends " *" to label
  // Validation
  valid?: boolean;          // false = error state
  errorMessage?: string;    // shown below drop zone when valid=false
  // File list (controlled)
  files?: FileUploadFile[];
  onRemove?: (id: string) => void;
  // Drop/select callback
  onFilesAdded: (files: File[]) => void;
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const UploadIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24" aria-hidden="true">
    <path
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="17 8 12 3 7 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ErrorIconLarge: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" width="24" height="24" aria-hidden="true">
    <path
      d="M8.4 2h7.2L22 8.4v7.2L15.6 22H8.4L2 15.6V8.4L8.4 2z"
      stroke="#c73a3a"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M15 9l-6 6M9 9l6 6" stroke="#c73a3a" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ErrorIconSmall: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">
    <path
      d="M5.6 1h4.8L15 5.6v4.8L10.4 15H5.6L1 10.4V5.6L5.6 1z"
      fill="#c73a3a"
    />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FileIcon: React.FC = () => (
  <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
    <path
      d="M11.5 2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7.5L11.5 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M11.5 2v5.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">
    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── FileRow ──────────────────────────────────────────────────────────────────

interface FileRowProps {
  file: FileUploadFile;
  isLast: boolean;
  onRemove?: (id: string) => void;
}

const FileRow: React.FC<FileRowProps> = ({ file, isLast, onRemove }) => {
  const isUploading = file.progress !== undefined && file.progress < 100;
  const isUploaded = !isUploading;

  return (
    <li className={`${styles['fu-file-row']} ${isLast ? styles['fu-file-row--last'] : ''}`}>
      {/* Icon pill */}
      <div className={styles['fu-file-icon-pill']}>
        <FileIcon />
      </div>

      {/* File info */}
      <div className={styles['fu-file-info']}>
        <div className={styles['fu-file-name-row']}>
          {isUploaded ? (
            file.href ? (
              <a
                href={file.href}
                className={styles['fu-file-name--uploaded']}
                title={file.name}
              >
                {file.name}
              </a>
            ) : (
              <span className={styles['fu-file-name--uploaded']} title={file.name}>
                {file.name}
              </span>
            )
          ) : (
            <span className={styles['fu-file-name--uploading']} title={file.name}>
              {file.name}
            </span>
          )}
          <span className={styles['fu-file-size']}>{formatBytes(file.size)}</span>
        </div>

        {isUploading && (
          <div className={styles['fu-progress-track']}>
            <div
              className={styles['fu-progress-fill']}
              style={{ width: `${file.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Remove button */}
      <button
        type="button"
        className={styles['fu-remove-btn']}
        aria-label={`Eliminar ${file.name}`}
        onClick={() => onRemove?.(file.id)}
      >
        <CloseIcon />
      </button>
    </li>
  );
};

// ─── FileUpload ───────────────────────────────────────────────────────────────

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  maxSize,
  label,
  hint = false,
  optional = false,
  required = false,
  valid = true,
  errorMessage,
  files: controlledFiles,
  onRemove,
  onFilesAdded,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Uncontrolled fallback when `files` prop is not provided
  const [internalFiles, setInternalFiles] = useState<FileUploadFile[]>([]);
  const isControlled = controlledFiles !== undefined;
  const displayFiles = isControlled ? controlledFiles : internalFiles;

  const processFiles = useCallback(
    (rawFiles: File[]) => {
      const valid: File[] = rawFiles.filter(
        (f) => !(maxSize && f.size > maxSize)
      );
      if (valid.length === 0) return;

      onFilesAdded(valid);

      if (!isControlled) {
        const newEntries: FileUploadFile[] = valid.map((f) => ({
          id: `${f.name}-${f.lastModified}-${f.size}`,
          name: f.name,
          size: f.size,
          progress: 100,
        }));
        setInternalFiles((prev) => (multiple ? [...prev, ...newEntries] : newEntries));
      }
    },
    [maxSize, multiple, onFilesAdded, isControlled]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      processFiles(Array.from(e.dataTransfer.files));
    },
    [processFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(Array.from(e.target.files ?? []));
      e.target.value = '';
    },
    [processFiles]
  );

  const handleInternalRemove = (id: string) => {
    if (isControlled) {
      onRemove?.(id);
    } else {
      setInternalFiles((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const openPicker = () => inputRef.current?.click();

  // Dropzone class composition
  const dropzoneClasses = [
    styles['fu-dropzone'],
    isDragOver ? styles['fu-dropzone--drag-over'] : '',
    !valid ? styles['fu-dropzone--invalid'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Hint text
  const hintParts: string[] = [];
  if (hint && accept) hintParts.push(`Formatos: ${accept}`);
  if (hint && maxSize) hintParts.push(`Máx. ${formatBytes(maxSize)}`);
  const hintText = hintParts.join(' · ');

  return (
    <div className={`${styles['fu-root']} ${className ?? ''}`}>
      {/* Label row */}
      {label && (
        <div className={styles['fu-label-row']}>
          <div className={styles['fu-label-line']}>
            <span className={styles['fu-label-text']}>{label}</span>
            {required && <span className={styles['fu-label-suffix']}>{' *'}</span>}
            {optional && <span className={styles['fu-label-suffix']}>{' (opcional)'}</span>}
          </div>
          {hintText && <p className={styles['fu-label-hint']}>{hintText}</p>}
        </div>
      )}

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Zona de carga de archivos"
        className={dropzoneClasses}
        onClick={openPicker}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openPicker(); }}
      >
        <div className={`${styles['fu-icon-pill']} ${!valid ? styles['fu-icon-pill--invalid'] : ''}`}>
          {valid ? <UploadIcon /> : <ErrorIconLarge />}
        </div>
        <p className={styles['fu-dropzone-primary']}>Arrastra y suelta tus archivos aquí</p>
        <p className={styles['fu-dropzone-secondary']}>o</p>
        <span className={styles['fu-dropzone-link']}>selecciona archivos</span>
      </div>

      {/* Error message */}
      {!valid && errorMessage && (
        <p className={styles['fu-error']} role="alert">
          <ErrorIconSmall />
          <span>{errorMessage}</span>
        </p>
      )}

      {/* File list */}
      {displayFiles.length > 0 && (
        <ul className={styles['fu-file-list']} aria-label="Archivos seleccionados">
          {displayFiles.map((f, idx) => (
            <FileRow
              key={f.id}
              file={f}
              isLast={idx === displayFiles.length - 1}
              onRemove={handleInternalRemove}
            />
          ))}
        </ul>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        aria-hidden="true"
        tabIndex={-1}
        onChange={handleChange}
      />
    </div>
  );
};

export default FileUpload;
