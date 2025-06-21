'use client';

import { DocumentTextIcon, FolderIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useDashboard } from '@/components/dashboard/DashboardContext';

export function FilesystemTab() {
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
}
