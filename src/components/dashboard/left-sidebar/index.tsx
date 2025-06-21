'use client';

import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDashboard } from '@/components/dashboard/DashboardContext';
import { NewJobDialog } from './NewJobDialog';
import { NewProjectDialog } from './NewProjectDialog';
import { ProjectItem } from './ProjectItem';
import { ProjectSettingsDialog } from './ProjectSettingsDialog';
import { UserAccountSection } from './UserAccountSection';

export function LeftSidebar() {
  const { projects, getJobsByProject, selectedJobId, setSelectedJobId } = useDashboard();
  const t = useTranslations('Dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set([1])); // Default project expanded
  const [showNewJobDialog, setShowNewJobDialog] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [showProjectSettingsDialog, setShowProjectSettingsDialog] = useState(false);
  const [selectedProjectForJob, setSelectedProjectForJob] = useState<number | null>(null);
  const [selectedProjectForSettings, setSelectedProjectForSettings] = useState<number | null>(null);

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

  const handleCreateJobInProject = (projectId: number) => {
    setSelectedProjectForJob(projectId);
    setShowNewJobDialog(true);
  };

  const handleProjectSettings = (projectId: number) => {
    setSelectedProjectForSettings(projectId);
    setShowProjectSettingsDialog(true);
  };

  const handleCreateJob = (jobData: { name: string; description: string; projectId: number }) => {
    // TODO: Implement job creation logic
    // eslint-disable-next-line no-console
    console.log('Creating job:', jobData);
  };

  const handleCreateProject = (projectData: { name: string; description: string }) => {
    // TODO: Implement project creation logic
    // eslint-disable-next-line no-console
    console.log('Creating project:', projectData);
  };

  const handleUpdateProject = (projectId: number, projectData: { name: string; description: string }) => {
    // TODO: Implement project update logic
    // eslint-disable-next-line no-console
    console.log('Updating project:', projectId, projectData);
  };

  const handleDeleteProject = (projectId: number) => {
    // TODO: Implement project deletion logic
    // eslint-disable-next-line no-console
    console.log('Deleting project:', projectId);
  };

  const closeNewJobDialog = () => {
    setShowNewJobDialog(false);
    setSelectedProjectForJob(null);
  };

  const closeProjectSettingsDialog = () => {
    setShowProjectSettingsDialog(false);
    setSelectedProjectForSettings(null);
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

        {/* New Project Button */}
        <button
          onClick={() => setShowNewProjectDialog(true)}
          className="w-full mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          New Project
        </button>
      </div>

      {/* Projects and Jobs */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {projects.map((project) => {
            const projectJobs = getJobsByProject(project.id);

            return (
              <ProjectItem
                key={project.id}
                project={project}
                projectJobs={projectJobs}
                isExpanded={expandedProjects.has(project.id)}
                selectedJobId={selectedJobId}
                onToggleProject={toggleProject}
                onJobClick={handleJobClick}
                onCreateJob={handleCreateJobInProject}
                onProjectSettings={handleProjectSettings}
              />
            );
          })}
        </div>
      </div>

      {/* User Account Section */}
      <UserAccountSection />

      {/* Dialogs */}
      <NewJobDialog
        isOpen={showNewJobDialog}
        selectedProjectId={selectedProjectForJob}
        projects={projects}
        onClose={closeNewJobDialog}
        onCreateJob={handleCreateJob}
      />

      <NewProjectDialog
        isOpen={showNewProjectDialog}
        onClose={() => setShowNewProjectDialog(false)}
        onCreateProject={handleCreateProject}
      />

      <ProjectSettingsDialog
        isOpen={showProjectSettingsDialog}
        selectedProjectId={selectedProjectForSettings}
        projects={projects}
        onClose={closeProjectSettingsDialog}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
      />
    </div>
  );
}
