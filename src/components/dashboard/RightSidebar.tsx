'use client';

import {
  ChartBarIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  FolderIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { FilesystemTab, GuiTab, LogsTab, MonitoringTab } from './right-sidebar';

type DetailType = 'monitoring' | 'logs' | 'filesystem' | 'gui' | null;

export function RightSidebar() {
  const t = useTranslations('Dashboard');
  const [activeDetail, setActiveDetail] = useState<DetailType>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [width, setWidth] = useState(96); // Start with icon bar width
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Resize logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !sidebarRef.current) {
        return;
      }

      const rect = sidebarRef.current.getBoundingClientRect();
      const newWidth = rect.right - e.clientX;

      // Set different min/max widths based on state
      const minWidth = isCollapsed ? 96 : 280; // Icon bar minimum or expanded minimum
      const maxWidth = 600;

      const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      setWidth(constrainedWidth);

      // Auto-expand if dragging beyond icon width
      if (constrainedWidth > 150 && isCollapsed) {
        setIsCollapsed(false);
        if (!activeDetail) {
          setActiveDetail('monitoring'); // Default to monitoring when expanding
        }
      }

      // Auto-collapse if dragging below threshold
      if (constrainedWidth <= 120 && !isCollapsed) {
        setIsCollapsed(true);
        setActiveDetail(null);
      }
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
  }, [isResizing, isCollapsed, activeDetail]);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const detailOptions = [
    { id: 'monitoring' as DetailType, icon: ChartBarIcon, label: t('monitoring.title'), color: 'text-blue-600' },
    { id: 'logs' as DetailType, icon: DocumentTextIcon, label: t('logs.title'), color: 'text-green-600' },
    { id: 'filesystem' as DetailType, icon: FolderIcon, label: t('filesystem.title'), color: 'text-orange-600' },
    { id: 'gui' as DetailType, icon: ComputerDesktopIcon, label: t('gui.title'), color: 'text-indigo-600' },
  ];

  const openDetail = (detail: DetailType) => {
    setActiveDetail(detail);
    setIsCollapsed(false);
    // Expand to a reasonable width if currently collapsed
    if (width <= 120) {
      setWidth(400);
    }
  };

  const closeDetail = () => {
    setActiveDetail(null);
    setIsCollapsed(true);
    setWidth(96); // Reset to icon bar width
  };

  const renderDetailContent = () => {
    switch (activeDetail) {
      case 'monitoring':
        return <MonitoringTab />;
      case 'logs':
        return <LogsTab />;
      case 'filesystem':
        return <FilesystemTab />;
      case 'gui':
        return <GuiTab />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={sidebarRef}
      className="flex h-full relative"
      style={{ width: `${width}px` }}
      data-right-sidebar
    >
      {/* Resize Handle */}
      <button
        type="button"
        className={`absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 transition-colors border-0 z-10 ${
          isResizing ? 'bg-blue-500' : 'bg-transparent hover:bg-gray-300'
        }`}
        onMouseDown={handleMouseDown}
        aria-label="Resize right panel"
      >
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 -left-1 w-3 h-8 bg-gray-400 rounded-full opacity-0 hover:opacity-100 transition-opacity ${
            isResizing ? 'opacity-100' : ''
          }`}
        />
      </button>

      {/* Quick Access Icons */}
      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-3 flex-shrink-0">
        {detailOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => openDetail(option.id)}
              className={`p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                activeDetail === option.id ? 'bg-gray-700' : ''
              }`}
              title={option.label}
            >
              <Icon className={`h-6 w-6 ${activeDetail === option.id ? option.color : 'text-gray-400'}`} />
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      {!isCollapsed && activeDetail && (
        <div className="bg-white shadow-lg border-l border-gray-200 flex-1 min-w-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 truncate">
              {detailOptions.find(opt => opt.id === activeDetail)?.label}
            </h2>
            <button
              onClick={closeDetail}
              className="p-1 hover:bg-gray-100 rounded flex-shrink-0"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto" style={{ height: 'calc(100vh - 73px)' }}>
            {renderDetailContent()}
          </div>
        </div>
      )}
    </div>
  );
}
