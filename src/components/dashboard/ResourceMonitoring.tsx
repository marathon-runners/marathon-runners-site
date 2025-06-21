'use client';

import type { Job } from '@/types/Job';
import { CpuChipIcon } from '@heroicons/react/24/outline';

type ResourceMonitoringProps = {
  job: Job;
};

export function ResourceMonitoring({ job }: ResourceMonitoringProps) {
  // Generate mock monitoring data based on selected job
  const getMonitoringData = () => {
    if (!job) {
      return { cpu: 0, gpu: 0, memory: 0 };
    }

    // Generate realistic data based on job status and progress
    const baseLoad = job.status === 'running' ? job.progress : 0;
    return {
      cpu: job.status === 'running' ? Math.min(75 + baseLoad * 0.2, 95) : 0,
      gpu: job.status === 'running' ? Math.min(85 + baseLoad * 0.1, 98) : 0,
      memory: job.status === 'running' ? Math.min(40 + baseLoad * 0.3, 80) : 0,
    };
  };

  const monitoringData = getMonitoringData();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CpuChipIcon className="h-5 w-5" />
        Resource Monitoring
      </h3>
      <div className="space-y-4">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm font-medium text-gray-700 mb-1">
            CPU Usage
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${monitoringData.cpu}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {monitoringData.cpu.toFixed(1)}
            % (
            {job.hardwareType}
            )
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm font-medium text-gray-700 mb-1">
            GPU Usage
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${monitoringData.gpu}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {monitoringData.gpu.toFixed(1)}
            % (
            {job.hardwareType}
            )
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm font-medium text-gray-700 mb-1">
            Memory Usage
          </div>
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
      </div>
    </div>
  );
}
