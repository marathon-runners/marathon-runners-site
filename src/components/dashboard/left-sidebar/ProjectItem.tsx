'use client';

import {
  ChevronDownIcon,
  ChevronRightIcon,
  CogIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

type Job = {
  id: number;
  name: string;
  status: string;
  projectId: number;
};

type Project = {
  id: number;
  name: string;
  isDefault?: boolean;
};

type ProjectItemProps = {
  project: Project;
  projectJobs: Job[];
  isExpanded: boolean;
  selectedJobId: number | null;
  onToggleProject: (projectId: number) => void;
  onJobClick: (jobId: number) => void;
  onCreateJob: (projectId: number) => void;
  onProjectSettings: (projectId: number) => void;
};

export function ProjectItem({
  project,
  projectJobs,
  isExpanded,
  selectedJobId,
  onToggleProject,
  onJobClick,
  onCreateJob,
  onProjectSettings,
}: ProjectItemProps) {
  const t = useTranslations('Dashboard');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-green-600 bg-green-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    return t(`job_status.${status}` as any) || status;
  };

  return (
    <div
      className={project.isDefault ? '' : 'border border-gray-200 rounded-lg'}
    >
      {/* Project Header */}
      <div
        className={`flex items-center justify-between p-3 ${project.isDefault ? '' : 'hover:bg-gray-50'}`}
      >
        <button
          onClick={() => onToggleProject(project.id)}
          className="flex items-center gap-2 flex-1 text-left"
        >
          {isExpanded
            ? (
                <ChevronDownIcon className="h-4 w-4" />
              )
            : (
                <ChevronRightIcon className="h-4 w-4" />
              )}
          <span className="font-medium">
            {project.name}
            {project.isDefault && (
              <span className="text-xs text-gray-500 ml-1">(Default)</span>
            )}
          </span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onCreateJob(project.id)}
            className="p-1 hover:bg-gray-200 rounded"
            title="Create new job in this project"
          >
            <PlusIcon className="h-4 w-4 text-blue-600" />
          </button>
          {!project.isDefault && (
            <button
              onClick={() => onProjectSettings(project.id)}
              className="p-1 hover:bg-gray-200 rounded"
              title="Project settings"
            >
              <CogIcon className="h-4 w-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Jobs List */}
      {isExpanded && (
        <div className={project.isDefault ? '' : 'border-t border-gray-100'}>
          {projectJobs.map(job => (
            <button
              key={job.id}
              onClick={() => onJobClick(job.id)}
              className={`w-full px-6 py-2 hover:bg-gray-50 cursor-pointer ${project.isDefault ? '' : 'border-b border-gray-50 last:border-b-0'} transition-colors ${
                selectedJobId === job.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm ${selectedJobId === job.id ? 'text-blue-900 font-medium' : 'text-gray-700'}`}
                >
                  {job.name}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}
                >
                  {getStatusLabel(job.status)}
                </span>
              </div>
            </button>
          ))}

          {projectJobs.length === 0 && (
            <div className="px-6 py-3 text-sm text-gray-500 italic">
              No jobs in this project
              <button
                onClick={() => onCreateJob(project.id)}
                className="block text-blue-600 hover:text-blue-700 mt-1"
              >
                Create your first job
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
