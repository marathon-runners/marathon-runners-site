'use client';

import { useTranslations } from 'next-intl';
import { useDashboard } from '@/components/dashboard/DashboardContext';

export function MonitoringTab() {
  const { selectedJob } = useDashboard();
  const t = useTranslations('Dashboard');

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

  if (!selectedJob) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p className="text-sm">{t('select_job_message')}</p>
      </div>
    );
  }

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
                {' '}
                {selectedJob.name}
              </div>
              <div>
                Runtime:
                {' '}
                {selectedJob.runtime}
              </div>
              <div>
                Region:
                {' '}
                {selectedJob.region}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
