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
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDashboard } from '@/components/dashboard/DashboardContext';

type DetailType = 'monitoring' | 'logs' | 'cli' | 'filesystem' | 'gui' | 'heatmap' | null;

export function RightSidebar() {
  const { selectedJob } = useDashboard();
  const t = useTranslations('Dashboard');
  const [activeDetail, setActiveDetail] = useState<DetailType>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const detailOptions = [
    { id: 'monitoring' as DetailType, icon: ChartBarIcon, label: t('monitoring.title'), color: 'text-blue-600' },
    { id: 'logs' as DetailType, icon: DocumentTextIcon, label: t('logs.title'), color: 'text-green-600' },
    { id: 'cli' as DetailType, icon: CommandLineIcon, label: t('cli.title'), color: 'text-purple-600' },
    { id: 'filesystem' as DetailType, icon: FolderIcon, label: t('filesystem.title'), color: 'text-orange-600' },
    { id: 'gui' as DetailType, icon: ComputerDesktopIcon, label: t('gui.title'), color: 'text-indigo-600' },
    { id: 'heatmap' as DetailType, icon: MapIcon, label: t('geography.title'), color: 'text-red-600' },
  ];

  const openDetail = (detail: DetailType) => {
    setActiveDetail(detail);
    setIsCollapsed(false);
  };

  const closeDetail = () => {
    setActiveDetail(null);
    setIsCollapsed(true);
  };

  // Generate mock monitoring data based on selected job
  const getMonitoringData = () => {
    if (!selectedJob) {
      return { cpu: 0, gpu: 0, memory: 0 };
    }

    // Generate realistic data based on job status and progress
    const baseLoad = selectedJob.status === 'running' ? selectedJob.progress : 0;
    return {
      cpu: selectedJob.status === 'running' ? Math.min(75 + (baseLoad * 0.2), 95) : 0,
      gpu: selectedJob.status === 'running' ? Math.min(85 + (baseLoad * 0.1), 98) : 0,
      memory: selectedJob.status === 'running' ? Math.min(40 + (baseLoad * 0.3), 80) : 0,
    };
  };

  const monitoringData = getMonitoringData();

  const renderDetailContent = () => {
    if (!selectedJob && activeDetail !== 'heatmap') {
      return (
        <div className="p-4 text-center text-gray-500">
          <p className="text-sm">{t('select_job_message')}</p>
        </div>
      );
    }

    switch (activeDetail) {
      case 'monitoring':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">{t('monitoring.title')}</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium text-gray-700 mb-1">{t('monitoring.cpu_usage')}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${monitoringData.cpu}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {monitoringData.cpu.toFixed(1)}
                  %
                  {selectedJob && `(${selectedJob.hardwareType})`}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium text-gray-700 mb-1">{t('monitoring.gpu_usage')}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${monitoringData.gpu}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {monitoringData.gpu.toFixed(1)}
                  %
                  {selectedJob && `(${selectedJob.hardwareType})`}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium text-gray-700 mb-1">{t('monitoring.memory_usage')}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${monitoringData.memory}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {monitoringData.memory.toFixed(1)}
                  % (Memory)
                </div>
              </div>

              {selectedJob && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>
                      Job:
                      {selectedJob.name}
                    </div>
                    <div>
                      Runtime:
                      {selectedJob.runtime}
                    </div>
                    <div>
                      Region:
                      {selectedJob.region}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'logs':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">{t('logs.title')}</h3>
            <div className="bg-black text-green-400 font-mono text-xs p-3 rounded h-64 overflow-y-auto">
              <div>
                [2024-01-15 10:30:15] Starting job:
                {selectedJob?.name}
              </div>
              <div>[2024-01-15 10:30:16] Loading model weights...</div>
              <div>
                [2024-01-15 10:30:18] GPU initialized:
                {selectedJob?.hardwareType}
              </div>
              <div>
                [2024-01-15 10:30:20] Training started - Progress:
                {selectedJob?.progress}
                %
              </div>
              <div>
                [2024-01-15 10:30:25] Region:
                {selectedJob?.region}
              </div>
              <div>
                [2024-01-15 10:30:30] Status:
                {selectedJob?.status}
              </div>
              <div>
                [2024-01-15 10:30:35] Runtime:
                {selectedJob?.runtime}
              </div>
              {selectedJob?.status === 'running' && (
                <>
                  <div className="text-yellow-400">[2024-01-15 10:30:40] Warning: High GPU utilization</div>
                  <div>[2024-01-15 10:30:45] Processing batch...</div>
                  <div className="text-blue-400">
                    [2024-01-15 10:30:50] Progress:
                    {selectedJob.progress}
                    %
                  </div>
                </>
              )}
              {selectedJob?.status === 'failed' && (
                <div className="text-red-400">[2024-01-15 10:30:45] ERROR: Job execution failed</div>
              )}
              {selectedJob?.status === 'completed' && (
                <div className="text-green-400">[2024-01-15 10:30:50] Job completed successfully</div>
              )}
            </div>
          </div>
        );

      case 'cli':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">{t('cli.title')}</h3>
            <div className="bg-black text-white font-mono text-sm p-3 rounded">
              <div className="mb-2">$ nvidia-smi</div>
              <div className="text-green-400 text-xs mb-3">
                GPU 0:
                {' '}
                {selectedJob?.hardwareType || 'No GPU'}
                {' '}
                (UUID: GPU-12345678)
                <br />
                Memory:
                {' '}
                {monitoringData.memory.toFixed(0)}
                % utilized
                <br />
                Temperature: 67C
              </div>
              <div className="mb-2">$ htop</div>
              <div className="text-blue-400 text-xs mb-3">
                CPU:
                {' '}
                {monitoringData.cpu.toFixed(1)}
                % | Memory:
                {' '}
                {monitoringData.memory.toFixed(1)}
                % | Load: 2.34
              </div>
              <div className="mb-2">
                $ job status
                {selectedJob?.id}
              </div>
              <div className="text-yellow-400 text-xs mb-3">
                Status:
                {' '}
                {selectedJob?.status}
                {' '}
                | Progress:
                {' '}
                {selectedJob?.progress}
                %
              </div>
              <div className="flex items-center">
                <span className="text-green-400">user@compute-node:~$ </span>
                <input
                  type="text"
                  className="bg-transparent border-none outline-none text-white ml-1 flex-1"
                  placeholder={t('cli.enter_command')}
                />
              </div>
            </div>
          </div>
        );

      case 'filesystem':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">{t('filesystem.title')}</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <FolderIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm">
                  job-
                  {selectedJob?.id}
                  /
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ml-4">
                <FolderIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm">datasets/</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ml-4">
                <FolderIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm">models/</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ml-4">
                <FolderIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm">outputs/</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ml-4">
                <DocumentTextIcon className="h-4 w-4 text-gray-600" />
                <span className="text-sm">
                  {selectedJob?.name.toLowerCase().replace(/\s+/g, '_')}
                  .py
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ml-4">
                <DocumentTextIcon className="h-4 w-4 text-gray-600" />
                <span className="text-sm">requirements.txt</span>
              </div>
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ml-4">
                <DocumentTextIcon className="h-4 w-4 text-gray-600" />
                <span className="text-sm">config.yaml</span>
              </div>
            </div>
          </div>
        );

      case 'gui':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">{t('gui.title')}</h3>
            <div className="border-2 border-gray-300 rounded bg-gray-100 h-48 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <ComputerDesktopIcon className="h-12 w-12 mx-auto mb-2" />
                <div className="text-sm">Remote GUI Session</div>
                <div className="text-xs">{t('gui.click_to_connect')}</div>
                {selectedJob && (
                  <div className="text-xs mt-2 text-gray-400">
                    Job:
                    {' '}
                    {selectedJob.name}
                    {' '}
                    (
                    {selectedJob.hardwareType}
                    )
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                {t('gui.connect')}
              </button>
              <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300">
                {t('gui.full_screen')}
              </button>
            </div>
          </div>
        );

      case 'heatmap':
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">{t('geography.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm font-medium">US-East-1</span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-700">$2.40/hr</div>
                  <div className="text-xs text-green-600">
                    95%
                    {t('geography.available')}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <span className="text-sm font-medium">US-West-2</span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-yellow-700">$2.65/hr</div>
                  <div className="text-xs text-yellow-600">
                    78%
                    {t('geography.available')}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="text-sm font-medium">EU-Central-1</span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-red-700">$3.20/hr</div>
                  <div className="text-xs text-red-600">
                    23%
                    {t('geography.available')}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-sm font-medium">Asia-Pacific-1</span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-blue-700">$2.80/hr</div>
                  <div className="text-xs text-blue-600">
                    67%
                    {t('geography.available')}
                  </div>
                </div>
              </div>

              {selectedJob && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-600">
                    <div className="font-medium">Current Job Region:</div>
                    <div className="text-blue-600 font-semibold">{selectedJob.region}</div>
                    <div className="mt-1">
                      $
                      {selectedJob.costPerHour}
                      /hr
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full" data-right-sidebar>
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
        <div
          className="bg-white shadow-lg border-l border-gray-200 flex-shrink-0 w-80 max-w-md min-w-0"
        >
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
