'use client';

import { ClockIcon, PlayIcon, StopIcon } from '@heroicons/react/24/outline';

// Mock job data
const mockJob = {
  id: 1,
  name: 'ML Training Job',
  status: 'running',
  progress: 65,
  startedAt: '2024-01-15T10:30:00Z',
  estimatedCompletion: '2024-01-15T14:45:00Z',
  hardwareType: 'NVIDIA A100',
  region: 'US-East-1',
  costPerHour: 2.40,
  totalCost: 15.60,
  runtime: '6h 30m',
};

export function JobDetails() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{mockJob.name}</h2>
          <div className="flex items-center gap-4 mt-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(mockJob.status)}`}>
              {mockJob.status}
            </span>
            <span className="text-sm text-gray-500">
              ID:
              {mockJob.id}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            <StopIcon className="h-4 w-4" />
            Stop Job
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            <PlayIcon className="h-4 w-4" />
            Restart
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">
            {mockJob.progress}
            %
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${mockJob.progress}%` }}
          >
          </div>
        </div>
      </div>

      {/* Job Information Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Hardware</div>
          <div className="text-lg font-semibold text-gray-900">{mockJob.hardwareType}</div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Region</div>
          <div className="text-lg font-semibold text-gray-900">{mockJob.region}</div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Runtime</div>
          <div className="text-lg font-semibold text-gray-900">{mockJob.runtime}</div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Total Cost</div>
          <div className="text-lg font-semibold text-gray-900">
            $
            {mockJob.totalCost.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500">Started:</span>
            <span className="font-medium text-gray-900">{formatTime(mockJob.startedAt)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500">Est. Completion:</span>
            <span className="font-medium text-gray-900">{formatTime(mockJob.estimatedCompletion)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
