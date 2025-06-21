'use client';

import {
  ChartBarIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  FolderIcon,
  MapIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

type DetailType = 'monitoring' | 'logs' | 'cli' | 'filesystem' | 'gui' | 'heatmap' | null;

export function RightSidebar() {
  const [activeDetail, setActiveDetail] = useState<DetailType>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const detailOptions = [
    { id: 'monitoring' as DetailType, icon: ChartBarIcon, label: 'Monitoring', color: 'text-blue-600' },
    { id: 'logs' as DetailType, icon: DocumentTextIcon, label: 'Logs', color: 'text-green-600' },
    { id: 'cli' as DetailType, icon: CommandLineIcon, label: 'CLI', color: 'text-purple-600' },
    { id: 'filesystem' as DetailType, icon: FolderIcon, label: 'Files', color: 'text-orange-600' },
    { id: 'gui' as DetailType, icon: ComputerDesktopIcon, label: 'GUI', color: 'text-indigo-600' },
    { id: 'heatmap' as DetailType, icon: MapIcon, label: 'Geography', color: 'text-red-600' },
  ];

  const openDetail = (detail: DetailType) => {
    setActiveDetail(detail);
    setIsCollapsed(false);
  };

  const closeDetail = () => {
    setActiveDetail(null);
    setIsCollapsed(true);
  };

  const renderDetailContent = () => {
    switch (activeDetail) {
      case 'monitoring':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Performance Monitoring</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium text-gray-700 mb-1">CPU Usage</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">75% (8/16 cores)</div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium text-gray-700 mb-1">GPU Usage</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">92% (A100 GPU)</div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium text-gray-700 mb-1">Memory Usage</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">45% (18GB/40GB)</div>
              </div>
            </div>
          </div>
        );

      case 'logs':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Job Logs</h3>
            <div className="bg-black text-green-400 font-mono text-xs p-3 rounded h-64 overflow-y-auto">
              <div>[2024-01-15 10:30:15] Starting job execution...</div>
              <div>[2024-01-15 10:30:16] Loading model weights...</div>
              <div>[2024-01-15 10:30:18] GPU initialized: NVIDIA A100</div>
              <div>[2024-01-15 10:30:20] Training started - Epoch 1/100</div>
              <div>[2024-01-15 10:30:25] Batch 1/1000 - Loss: 0.8234</div>
              <div>[2024-01-15 10:30:30] Batch 2/1000 - Loss: 0.7891</div>
              <div>[2024-01-15 10:30:35] Batch 3/1000 - Loss: 0.7654</div>
              <div className="text-yellow-400">[2024-01-15 10:30:40] Warning: High GPU temperature</div>
              <div>[2024-01-15 10:30:45] Batch 4/1000 - Loss: 0.7432</div>
            </div>
          </div>
        );

      case 'cli':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Command Line Interface</h3>
            <div className="bg-black text-white font-mono text-sm p-3 rounded">
              <div className="mb-2">$ nvidia-smi</div>
              <div className="text-green-400 text-xs mb-3">
                GPU 0: NVIDIA A100 (UUID: GPU-12345678)
                <br />
                Memory: 18432MiB / 40960MiB
                <br />
                Temperature: 67C
              </div>
              <div className="mb-2">$ htop</div>
              <div className="text-blue-400 text-xs mb-3">
                CPU: 75.2% | Memory: 45.1% | Load: 2.34
              </div>
              <div className="flex items-center">
                <span className="text-green-400">user@compute-node:~$ </span>
                <input
                  type="text"
                  className="bg-transparent border-none outline-none text-white ml-1 flex-1"
                  placeholder="Enter command..."
                />
              </div>
            </div>
          </div>
        );

      case 'filesystem':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">File System</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <FolderIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm">datasets/</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <FolderIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm">models/</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <FolderIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm">outputs/</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <DocumentTextIcon className="h-4 w-4 text-gray-600" />
                <span className="text-sm">train.py</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <DocumentTextIcon className="h-4 w-4 text-gray-600" />
                <span className="text-sm">requirements.txt</span>
              </div>
            </div>
          </div>
        );

      case 'gui':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Remote Desktop</h3>
            <div className="border-2 border-gray-300 rounded bg-gray-100 h-48 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <ComputerDesktopIcon className="h-12 w-12 mx-auto mb-2" />
                <div className="text-sm">Remote GUI Session</div>
                <div className="text-xs">Click to connect</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                Connect
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300">
                Full Screen
              </button>
            </div>
          </div>
        );

      case 'heatmap':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Geographic Pricing</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm font-medium">US-East-1</span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-700">$2.40/hr</div>
                  <div className="text-xs text-green-600">95% available</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <span className="text-sm font-medium">US-West-2</span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-yellow-700">$2.65/hr</div>
                  <div className="text-xs text-yellow-600">78% available</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="text-sm font-medium">EU-Central-1</span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-red-700">$3.20/hr</div>
                  <div className="text-xs text-red-600">23% available</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-sm font-medium">Asia-Pacific-1</span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-blue-700">$2.80/hr</div>
                  <div className="text-xs text-blue-600">67% available</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Quick Access Icons */}
      <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-3">
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
        <div className="w-80 bg-white shadow-lg border-l border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">
              {detailOptions.find(opt => opt.id === activeDetail)?.label}
            </h2>
            <button
              onClick={closeDetail}
              className="p-1 hover:bg-gray-100 rounded"
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
