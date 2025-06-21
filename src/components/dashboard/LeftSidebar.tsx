'use client';

import { SignOutButton } from '@clerk/nextjs';
import { ChevronDownIcon, ChevronRightIcon, PlusIcon, UserIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDashboard } from '@/components/dashboard/DashboardContext';

export function LeftSidebar() {
  const { projects, getJobsByProject, selectedJobId, setSelectedJobId } = useDashboard();
  const t = useTranslations('Dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set([1])); // Default project expanded
  const [showNewJobDialog, setShowNewJobDialog] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);

  const toggleProject = (projectId: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const handleJobClick = (jobId: number) => {
    setSelectedJobId(jobId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    return t(`job_status.${status}` as any) || status;
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-white shadow-lg flex flex-col h-full">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-4 hover:bg-gray-50"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{t('sidebar_title')}</h2>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronDownIcon className="h-5 w-5 transform rotate-90" />
          </button>
        </div>

        {/* New Job Button */}
        <button
          onClick={() => setShowNewJobDialog(true)}
          className="w-full mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          {t('new_job_button')}
        </button>
      </div>

      {/* Projects and Jobs */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {projects.map((project) => {
            const projectJobs = getJobsByProject(project.id);

            return (
              <div key={project.id} className="border border-gray-200 rounded-lg">
                {/* Project Header */}
                <div className="flex items-center justify-between p-3 hover:bg-gray-50">
                  <button
                    onClick={() => toggleProject(project.id)}
                    className="flex items-center gap-2 flex-1 text-left"
                  >
                    {expandedProjects.has(project.id)
                      ? (
                          <ChevronDownIcon className="h-4 w-4" />
                        )
                      : (
                          <ChevronRightIcon className="h-4 w-4" />
                        )}
                    <span className="font-medium">
                      {project.name}
                      {project.isDefault && <span className="text-xs text-gray-500 ml-1">(Default)</span>}
                    </span>
                  </button>

                  <button
                    onClick={() => setShowNewProjectDialog(true)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>

                {/* Jobs List */}
                {expandedProjects.has(project.id) && (
                  <div className="border-t border-gray-100">
                    {projectJobs.map(job => (
                      <button
                        key={job.id}
                        onClick={() => handleJobClick(job.id)}
                        className={`w-full px-6 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors ${
                          selectedJobId === job.id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${selectedJobId === job.id ? 'text-blue-900 font-medium' : 'text-gray-700'}`}>
                            {job.name}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                            {getStatusLabel(job.status)}
                          </span>
                        </div>
                      </button>
                    ))}

                    {projectJobs.length === 0 && (
                      <div className="px-6 py-3 text-sm text-gray-500 italic">
                        No jobs in this project
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* User Account Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">User Account</div>
            <div className="text-xs text-gray-500">user@example.com</div>
          </div>
          <SignOutButton>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>

      {/* Simple Dialogs - TODO: Replace with proper modal components */}
      {showNewJobDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Create New Job</h3>
            <p className="text-gray-600 mb-4">Job creation wizard will be implemented here.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowNewJobDialog(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewProjectDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  id="project-name"
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="project-description"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                  placeholder="Project description (optional)"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowNewProjectDialog(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
