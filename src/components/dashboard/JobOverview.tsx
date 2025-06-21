'use client';

import type { Job } from '@/types/Job';
import {
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  MapIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { ComputeProviderHeatmap } from './ComputeProviderHeatmap';
import { CostCalculator } from './CostCalculator';
import { HardwareSelector } from './HardwareSelector';
import { JobHeader } from './JobHeader';
import { ResourceMonitoring } from './ResourceMonitoring';

type JobOverviewProps = {
  job: Job;
};

export function JobOverview({ job }: JobOverviewProps) {
  const renderStatusSpecificContent = () => {
    switch (job.status) {
      case 'pending':
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-yellow-800">
                Job Queued
              </h3>
            </div>
            <p className="text-yellow-700 mb-4">
              This job is waiting for available resources. Estimated start time
              depends on current queue and resource availability.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-yellow-800">
                  Queue Position:
                </span>
                <span className="ml-2 text-yellow-700">#3</span>
              </div>
              <div>
                <span className="font-medium text-yellow-800">
                  Est. Start Time:
                </span>
                <span className="ml-2 text-yellow-700">~15 minutes</span>
              </div>
            </div>
          </div>
        );

      case 'running':
        return (
          <div className="space-y-6">
            {/* Real-time Progress */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <PlayIcon className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">
                  Job Running
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-blue-700">Progress</span>
                    <span className="text-blue-700">
                      {job.progress}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-800">Runtime:</span>
                    <span className="ml-2 text-blue-700">{job.runtime}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-800">
                      Est. Completion:
                    </span>
                    <span className="ml-2 text-blue-700">
                      {job.estimatedCompletion
                        ? new Date(job.estimatedCompletion).toLocaleTimeString()
                        : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-800">
                      Current Cost:
                    </span>
                    <span className="ml-2 text-blue-700">
                      $
                      {job.totalCost.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resource Monitoring for Running Jobs */}
            <ResourceMonitoring job={job} />
          </div>
        );

      case 'completed':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">
                Job Completed Successfully
              </h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-green-800">
                  Total Runtime:
                </span>
                <span className="ml-2 text-green-700">{job.runtime}</span>
              </div>
              <div>
                <span className="font-medium text-green-800">Final Cost:</span>
                <span className="ml-2 text-green-700">
                  $
                  {job.totalCost.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="font-medium text-green-800">Completed:</span>
                <span className="ml-2 text-green-700">
                  {job.estimatedCompletion
                    ? new Date(job.estimatedCompletion).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
              <div>
                <span className="font-medium text-green-800">Efficiency:</span>
                <span className="ml-2 text-green-700">98.5%</span>
              </div>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-red-800">Job Failed</h3>
            </div>
            <p className="text-red-700 mb-4">
              The job encountered an error and was terminated. Check the logs
              for detailed error information.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-red-800">Failed At:</span>
                <span className="ml-2 text-red-700">
                  {job.progress}
                  % completion
                </span>
              </div>
              <div>
                <span className="font-medium text-red-800">Cost Incurred:</span>
                <span className="ml-2 text-red-700">
                  $
                  {job.totalCost.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-red-200">
              <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors">
                Restart Job
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Job Header */}
      <JobHeader job={job} />

      {/* Status-specific Content */}
      {renderStatusSpecificContent()}

      {/* Compute Provider Heatmap */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <MapIcon className="h-6 w-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Global Compute Availability
          </h3>
        </div>
        <ComputeProviderHeatmap />
      </div>

      {/* Hardware Selection and Cost Calculator Grid - Only show for pending/failed jobs */}
      {(job.status === 'pending' || job.status === 'failed') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HardwareSelector />
          <CostCalculator />
        </div>
      )}

      {/* Performance Analytics for completed jobs */}
      {job.status === 'completed' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <ChartBarIcon className="h-6 w-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Performance Analytics
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">
                CPU Utilization
              </h4>
              <div className="text-2xl font-bold text-blue-600">87.3%</div>
              <p className="text-sm text-gray-600">Average during runtime</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Memory Usage</h4>
              <div className="text-2xl font-bold text-green-600">12.4 GB</div>
              <p className="text-sm text-gray-600">Peak usage</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Cost Efficiency
              </h4>
              <div className="text-2xl font-bold text-purple-600">$0.032</div>
              <p className="text-sm text-gray-600">Per compute unit</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
