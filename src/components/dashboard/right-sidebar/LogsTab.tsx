'use client';

import { useTranslations } from 'next-intl';
import { useProjects } from '@/components/dashboard/ProjectsContext';

export function LogsTab() {
  const { selectedJob } = useProjects();
  const t = useTranslations('Dashboard');

  if (!selectedJob) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p className="text-sm">{t('select_job_message')}</p>
      </div>
    );
  }

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
          {' '}
          {selectedJob?.hardwareType}
        </div>
        <div>
          [2024-01-15 10:30:20] Training started - Progress:
          {' '}
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
            <div className="text-yellow-400">
              [2024-01-15 10:30:40] Warning: High GPU utilization
            </div>
            <div>[2024-01-15 10:30:45] Processing batch...</div>
            <div className="text-blue-400">
              [2024-01-15 10:30:50] Progress:
              {' '}
              {selectedJob.progress}
              %
            </div>
          </>
        )}
        {selectedJob?.status === 'failed' && (
          <div className="text-red-400">
            [2024-01-15 10:30:45] ERROR: Job execution failed
          </div>
        )}
        {selectedJob?.status === 'completed' && (
          <div className="text-green-400">
            [2024-01-15 10:30:50] Job completed successfully
          </div>
        )}
      </div>
    </div>
  );
}
