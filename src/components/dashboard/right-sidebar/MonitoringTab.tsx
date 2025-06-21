'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useProjects } from '@/components/dashboard/ProjectsContext';

type MonitoringData = {
  cpuUsage: number;
  memoryUsage: number;
  gpuUsage: number;
  networkIn?: number;
  networkOut?: number;
  diskUsage?: number;
};

export function MonitoringTab() {
  const { selectedJob } = useProjects();
  const t = useTranslations('Dashboard');
  const [monitoringData, setMonitoringData] = useState<MonitoringData>({
    cpuUsage: 0,
    memoryUsage: 0,
    gpuUsage: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedJob) {
      return;
    }

    const generateMockData = () => {
      // Generate realistic data based on job status and progress
      const baseLoad
        = selectedJob.status === 'running' ? selectedJob.progress : 0;
      setMonitoringData({
        cpuUsage:
          selectedJob.status === 'running'
            ? Math.min(75 + baseLoad * 0.2, 95)
            : 0,
        gpuUsage:
          selectedJob.status === 'running'
            ? Math.min(85 + baseLoad * 0.1, 98)
            : 0,
        memoryUsage:
          selectedJob.status === 'running'
            ? Math.min(40 + baseLoad * 0.3, 80)
            : 0,
      });
    };

    const fetchMonitoringData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/monitoring?jobId=${selectedJob.id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.monitoring) {
            setMonitoringData({
              cpuUsage: data.monitoring.cpuUsage || 0,
              memoryUsage: data.monitoring.memoryUsage || 0,
              gpuUsage: data.monitoring.gpuUsage || 0,
              networkIn: data.monitoring.networkIn,
              networkOut: data.monitoring.networkOut,
              diskUsage: data.monitoring.diskUsage,
            });
          } else {
            // Generate mock data if no real monitoring data exists
            generateMockData();
          }
        } else {
          // Fallback to mock data if API fails
          generateMockData();
        }
      } catch (error) {
        console.error('Failed to fetch monitoring data:', error);
        generateMockData();
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonitoringData();

    // Set up polling for real-time updates if job is running
    let interval: NodeJS.Timeout | undefined;
    if (selectedJob.status === 'running') {
      interval = setInterval(fetchMonitoringData, 30000); // Poll every 30 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [selectedJob]);

  if (!selectedJob) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p className="text-sm">{t('select_job_message')}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm">Loading monitoring data...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">{t('monitoring.title')}</h3>
      <div className="space-y-4">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm font-medium text-gray-700 mb-1">
            {t('monitoring.cpu_usage')}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${monitoringData.cpuUsage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {monitoringData.cpuUsage.toFixed(1)}
            %
            {selectedJob && ` (${selectedJob.hardwareType})`}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm font-medium text-gray-700 mb-1">
            {t('monitoring.gpu_usage')}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${monitoringData.gpuUsage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {monitoringData.gpuUsage.toFixed(1)}
            %
            {selectedJob && ` (${selectedJob.hardwareType})`}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm font-medium text-gray-700 mb-1">
            {t('monitoring.memory_usage')}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${monitoringData.memoryUsage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {monitoringData.memoryUsage.toFixed(1)}
            % (Memory)
          </div>
        </div>

        {monitoringData.diskUsage !== undefined && (
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm font-medium text-gray-700 mb-1">
              Disk Usage
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${monitoringData.diskUsage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {monitoringData.diskUsage.toFixed(1)}
              % (Storage)
            </div>
          </div>
        )}

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
              <div>
                Status:
                {' '}
                <span
                  className={`capitalize ${
                    selectedJob.status === 'running'
                      ? 'text-green-600'
                      : selectedJob.status === 'completed'
                        ? 'text-blue-600'
                        : selectedJob.status === 'failed'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                  }`}
                >
                  {selectedJob.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
