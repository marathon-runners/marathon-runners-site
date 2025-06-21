'use client';

import type { Job } from '@/types/Job';
import { CogIcon } from '@heroicons/react/24/outline';
import { useProjects } from './ProjectsContext';

type JobSettingsProps = {
  job: Job;
};

export function JobSettings({ job }: JobSettingsProps) {
  const { updateJob } = useProjects();

  const handleJobNameChange = (value: string) => {
    updateJob(job.id, { name: value });
  };

  const handleDescriptionChange = (value: string) => {
    updateJob(job.id, { description: value });
  };

  const handleNotificationChange = (
    key: 'emailOnCompletion' | 'emailOnFailure' | 'slackNotifications',
    value: boolean,
  ) => {
    const defaultNotifications = {
      emailOnCompletion: false,
      emailOnFailure: false,
      slackNotifications: false,
    };

    updateJob(job.id, {
      notifications: {
        ...defaultNotifications,
        ...job.notifications,
        [key]: value,
      },
    });
  };

  const handleAutoScalingChange = (
    key: 'enabled' | 'minInstances' | 'maxInstances',
    value: boolean | number,
  ) => {
    const defaultAutoScaling = {
      enabled: false,
      minInstances: 1,
      maxInstances: 5,
    };

    updateJob(job.id, {
      autoScaling: {
        ...defaultAutoScaling,
        ...job.autoScaling,
        [key]: value,
      },
    });
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CogIcon className="h-5 w-5" />
        Job Settings
      </h3>
      <div className="space-y-6">
        {/* Job Configuration */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Job Configuration
          </h4>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="job-name-setting"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Name
              </label>
              <input
                id="job-name-setting"
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={job.name}
                onChange={e => handleJobNameChange(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="job-description-setting"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="job-description-setting"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
                placeholder="Job description"
                value={job.description || ''}
                onChange={e => handleDescriptionChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Notifications
          </h4>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 mr-2"
                checked={job.notifications?.emailOnCompletion || false}
                onChange={e =>
                  handleNotificationChange(
                    'emailOnCompletion',
                    e.target.checked,
                  )}
              />
              <span className="text-sm text-gray-700">
                Email on job completion
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 mr-2"
                checked={job.notifications?.emailOnFailure || false}
                onChange={e =>
                  handleNotificationChange('emailOnFailure', e.target.checked)}
              />
              <span className="text-sm text-gray-700">
                Email on job failure
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 mr-2"
                checked={job.notifications?.slackNotifications || false}
                onChange={e =>
                  handleNotificationChange(
                    'slackNotifications',
                    e.target.checked,
                  )}
              />
              <span className="text-sm text-gray-700">Slack notifications</span>
            </label>
          </div>
        </div>

        {/* Auto-scaling */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Auto-scaling
          </h4>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 mr-2"
                checked={job.autoScaling?.enabled || false}
                onChange={e =>
                  handleAutoScalingChange('enabled', e.target.checked)}
              />
              <span className="text-sm text-gray-700">Enable auto-scaling</span>
            </label>
            <div className="ml-6 space-y-2">
              <div>
                <label htmlFor="min-instances" className="block text-xs text-gray-600 mb-1">
                  Min instances
                </label>
                <input
                  id="min-instances"
                  type="number"
                  className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                  value={job.autoScaling?.minInstances || 1}
                  onChange={e =>
                    handleAutoScalingChange(
                      'minInstances',
                      Number.parseInt(e.target.value, 10),
                    )}
                />
              </div>
              <div>
                <label htmlFor="max-instances" className="block text-xs text-gray-600 mb-1">
                  Max instances
                </label>
                <input
                  id="max-instances"
                  type="number"
                  className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                  value={job.autoScaling?.maxInstances || 5}
                  onChange={e =>
                    handleAutoScalingChange(
                      'maxInstances',
                      Number.parseInt(e.target.value, 10),
                    )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Auto-save notification */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 italic">
            Changes are saved automatically
          </p>
        </div>
      </div>
    </div>
  );
}
