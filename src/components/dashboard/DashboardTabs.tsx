'use client';

import {
  ChartBarIcon,
  CogIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDashboard } from '@/components/dashboard/DashboardContext';
import { JobLogs } from './JobLogs';
import { JobOverview } from './JobOverview';
import { JobSettings } from './JobSettings';

type TabType = 'overview' | 'logs' | 'settings';

export function DashboardTabs() {
  const { selectedJob } = useDashboard();
  const t = useTranslations('Dashboard');
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, icon: ChartBarIcon, label: 'Overview' },
    { id: 'logs' as TabType, icon: DocumentTextIcon, label: 'Logs' },
    { id: 'settings' as TabType, icon: CogIcon, label: 'Settings' },
  ];

  const renderTabContent = () => {
    if (!selectedJob) {
      return (
        <div className="text-center text-gray-500 py-12">
          <ComputerDesktopIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">{t('no_job_selected')}</h2>
          <p>{t('select_job_message')}</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return <JobOverview job={selectedJob} />;
      case 'logs':
        return <JobLogs job={selectedJob} />;
      case 'settings':
        return <JobSettings job={selectedJob} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
}
