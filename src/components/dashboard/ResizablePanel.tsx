'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type ResizablePanelProps = {
  children: ReactNode;
  side: 'left' | 'right';
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  className?: string;
};

export function ResizablePanel({
  children,
  side,
  minWidth = 200,
  maxWidth = 600,
  defaultWidth = 320,
  className = '',
}: ResizablePanelProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !panelRef.current) {
        return;
      }

      const rect = panelRef.current.getBoundingClientRect();
      let newWidth: number;

      if (side === 'left') {
        newWidth = e.clientX - rect.left;
      } else {
        newWidth = rect.right - e.clientX;
      }

      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, side, minWidth, maxWidth]);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  return (
    <div
      ref={panelRef}
      className={`relative ${className}`}
      style={{ width: `${width}px` }}
    >
      {children}

      {/* Resize Handle */}
      <button
        type="button"
        className={`absolute top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 transition-colors border-0 ${
          side === 'left' ? 'right-0' : 'left-0'
        } ${isResizing ? 'bg-blue-500' : 'bg-transparent hover:bg-gray-300'}`}
        onMouseDown={handleMouseDown}
        aria-label={`Resize ${side} panel`}
      >
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-8 bg-gray-400 rounded-full opacity-0 hover:opacity-100 transition-opacity ${
            side === 'left' ? '-right-1' : '-left-1'
          } ${isResizing ? 'opacity-100' : ''}`}
        />
      </button>
    </div>
  );
}
