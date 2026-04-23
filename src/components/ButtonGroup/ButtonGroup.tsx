/* ═══════════════════════════════════════════════════════════════
   ButtonGroup — Actuaria Design System
   Figma node: 3506:64616  ·  fileKey: N1wh3u4sX3UGyUU5oWOaz6
   ═══════════════════════════════════════════════════════════════ */
import React from 'react';
import styles from './ButtonGroup.module.css';

export type ButtonGroupLayout = 'Horizontal' | 'Vertical';
export type ButtonGroupSize   = 'Large' | 'Medium' | 'Small';

export interface ButtonGroupProps {
  children:   React.ReactNode;
  layout?:    ButtonGroupLayout;
  size?:      ButtonGroupSize;
  className?: string;
}

export function ButtonGroup({
  children,
  layout    = 'Horizontal',
  size      = 'Medium',
  className,
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={[
        styles['bg-root'],
        styles[`bg-layout--${layout.toLowerCase()}`],
        styles[`bg-size--${size.toLowerCase()}`],
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}

export default ButtonGroup;
