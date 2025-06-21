'use client';

import { ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useDashboard } from '@/components/dashboard/DashboardContext';

export function GuiTab() {
  const { selectedJob } = useDashboard();
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
}
