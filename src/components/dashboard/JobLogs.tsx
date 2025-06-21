'use client';

import type { Job } from '@/types/Job';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

type JobLogsProps = {
  job: Job;
};

export function JobLogs({ job }: JobLogsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <DocumentTextIcon className="h-5 w-5" />
        Job Logs
      </h3>
      <div className="bg-black text-green-400 font-mono text-sm p-4 rounded h-96 overflow-y-auto">
        <div>
          [2024-01-15 10:30:15] Starting job:
          {job.name}
        </div>
        <div>[2024-01-15 10:30:16] Loading model weights...</div>
        <div>
          [2024-01-15 10:30:18] GPU initialized:
          {job.hardwareType}
        </div>
        <div>
          [2024-01-15 10:30:20] Training started - Progress:
          {job.progress}
          %
        </div>
        <div>
          [2024-01-15 10:30:25] Region:
          {job.region}
        </div>
        <div>
          [2024-01-15 10:30:30] Status:
          {job.status}
        </div>
        <div>
          [2024-01-15 10:30:35] Runtime:
          {job.runtime}
        </div>
        {job.status === 'running' && (
          <>
            <div className="text-yellow-400">[2024-01-15 10:30:40] Warning: High GPU utilization</div>
            <div>[2024-01-15 10:30:45] Processing batch...</div>
            <div className="text-blue-400">
              [2024-01-15 10:30:50] Progress:
              {job.progress}
              %
            </div>
            <div>[2024-01-15 10:30:55] Checkpoint saved</div>
            <div>[2024-01-15 10:31:00] Continuing training...</div>
          </>
        )}
        {job.status === 'failed' && (
          <div className="text-red-400">[2024-01-15 10:30:45] ERROR: Job execution failed</div>
        )}
        {job.status === 'completed' && (
          <div className="text-green-400">[2024-01-15 10:30:50] Job completed successfully</div>
        )}
        <div className="text-gray-500">--- End of logs ---</div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Download Logs
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          Clear Logs
        </button>
      </div>
    </div>
  );
}
