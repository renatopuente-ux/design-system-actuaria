import React, { useCallback, useId, useRef, useState } from 'react';
import styles from './FileUpload.module.css';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  /** Max file size in bytes. Files exceeding this are rejected. */
  maxSize?: number;
  label?: string;
}

interface FileEntry {
  file: File;
  id: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept,
  multiple = false,
  maxSize,
  label = 'Arrastra archivos aquí o haz clic para seleccionar',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropzoneId = useId();
  const [isDragOver, setIsDragOver] = useState(false);
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const processFiles = useCallback(
    (rawFiles: File[]) => {
      const nextErrors: string[] = [];
      const valid: File[] = [];

      rawFiles.forEach((f) => {
        if (maxSize && f.size > maxSize) {
          nextErrors.push(`"${f.name}" supera el tamaño máximo de ${formatBytes(maxSize)}.`);
        } else {
          valid.push(f);
        }
      });

      if (valid.length > 0) {
        const newEntries: FileEntry[] = valid.map((f) => ({
          file: f,
          // Unique id per file instance — not security-critical, just a React key
          id: `${f.name}-${f.lastModified}-${f.size}`,
        }));
        setEntries((prev) => (multiple ? [...prev, ...newEntries] : newEntries));
        onUpload(valid);
      }

      setErrors(nextErrors);
    },
    [maxSize, multiple, onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    },
    [processFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      processFiles(files);
      // Reset input so the same file can be re-selected
      e.target.value = '';
    },
    [processFiles]
  );

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className={styles['fu-root']}>
      {/* Dropzone */}
      <div
        id={dropzoneId}
        role="button"
        tabIndex={0}
        aria-label="Zona de carga de archivos"
        className={`${styles['fu-dropzone']} ${isDragOver ? styles['fu-dropzone--drag-over'] : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
      >
        {/* Upload icon — inline SVG to avoid external asset dependency */}
        <svg
          className={styles['fu-icon']}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className={styles['fu-label']}>{label}</p>
        {accept && (
          <p className={styles['fu-hint']}>
            Formatos: {accept} {maxSize ? `· Máx. ${formatBytes(maxSize)}` : ''}
          </p>
        )}
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className={styles['fu-input']}
        aria-hidden="true"
        tabIndex={-1}
        onChange={handleChange}
      />

      {/* Error messages */}
      {errors.length > 0 && (
        <ul className={styles['fu-errors']} role="alert" aria-live="polite">
          {errors.map((err, i) => (
            <li key={i} className={styles['fu-error-item']}>{err}</li>
          ))}
        </ul>
      )}

      {/* File list */}
      {entries.length > 0 && (
        <ul className={styles['fu-file-list']} aria-label="Archivos seleccionados">
          {entries.map(({ file, id }) => (
            <li key={id} className={styles['fu-file-item']}>
              <span className={styles['fu-file-name']} title={file.name}>
                {file.name}
              </span>
              <span className={styles['fu-file-size']}>{formatBytes(file.size)}</span>
              <button
                type="button"
                className={styles['fu-remove-btn']}
                aria-label={`Eliminar ${file.name}`}
                onClick={() => removeEntry(id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
