'use client';

import type { ReactNode } from 'react';
import type { Job } from '@/types/Job';

import { useUser } from '@clerk/nextjs';
import { createContext, use, useEffect, useState } from 'react';

// Define Project type locally since we can't import from DatabaseService
export type Project = {
  id: number;
  name: string;
  description?: string;
  userId: string;
  isDefault: boolean;
  budget?: number;
  createdAt: Date;
  updatedAt: Date;
};

type DashboardContextType = {
  jobs: Job[];
  projects: Project[];
  selectedJobId: number | null;
  selectedJob: Job | null;
  isLoading: boolean;
  setSelectedJobId: (jobId: number | null) => void;
  getJobsByProject: (projectId: number) => Job[];
  updateJob: (jobId: number, updates: Partial<Job>) => Promise<void>;
  createJob: (jobData: { name: string; description?: string; projectId: number }) => Promise<void>;
  createProject: (projectData: { name: string; description?: string }) => Promise<void>;
  updateProject: (projectId: number, projectData: { name: string; description?: string }) => Promise<void>;
  deleteProject: (projectId: number) => Promise<void>;
  refreshData: () => Promise<void>;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const selectedJob = jobs.find(job => job.id === selectedJobId) || null;

  const refreshData = async () => {
    if (!user) {
      return;
    }

    setIsLoading(true);
    try {
      const [projectsRes, jobsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/jobs'),
      ]);

      if (!projectsRes.ok || !jobsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const projectsData = await projectsRes.json();
      const jobsData = await jobsRes.json();

      setProjects(projectsData.projects || []);
      setJobs(jobsData.jobs || []);

      // Set default selected job if none selected
      if (!selectedJobId && jobsData.jobs && jobsData.jobs.length > 0) {
        setSelectedJobId(jobsData.jobs[0]?.id || null);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      refreshData();
    }
  }, [user]);

  const getJobsByProject = (projectId: number) => {
    return jobs.filter(job => job.projectId === projectId);
  };

  const handleUpdateJob = async (jobId: number, updates: Partial<Job>) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          ...updates,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update job');
      }

      // Update local state
      setJobs(prevJobs =>
        prevJobs.map(job =>
          job.id === jobId ? { ...job, ...updates } : job,
        ),
      );
    } catch (error) {
      console.error('Failed to update job:', error);
      throw error;
    }
  };

  const handleCreateJob = async (jobData: { name: string; description?: string; projectId: number }) => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...jobData,
          hardwareType: 'Intel Xeon', // Default hardware type
          region: 'US-East-1', // Default region
          costPerHour: 0.80, // Default cost
          notifications: {
            emailOnCompletion: true,
            emailOnFailure: true,
            slackNotifications: false,
          },
          autoScaling: {
            enabled: false,
            minInstances: 1,
            maxInstances: 1,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      const data = await response.json();
      setJobs(prevJobs => [data.job, ...prevJobs]);
      setSelectedJobId(data.job?.id || null);
    } catch (error) {
      console.error('Failed to create job:', error);
      throw error;
    }
  };

  const handleCreateProject = async (projectData: { name: string; description?: string }) => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const data = await response.json();
      setProjects(prevProjects => [...prevProjects, data.project]);
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  };

  const handleUpdateProject = async (projectId: number, projectData: { name: string; description?: string }) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          ...projectData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === projectId ? { ...project, ...projectData } : project,
        ),
      );
    } catch (error) {
      console.error('Failed to update project:', error);
      throw error;
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    try {
      const response = await fetch(`/api/projects?projectId=${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      // Remove project and its jobs from local state
      setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
      setJobs(prevJobs => prevJobs.filter(j => j.projectId !== projectId));

      // Clear selected job if it was in the deleted project
      if (selectedJob && selectedJob.projectId === projectId) {
        const remainingJobs = jobs.filter(j => j.projectId !== projectId);
        setSelectedJobId(remainingJobs.length > 0 ? remainingJobs[0]?.id || null : null);
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  };

  return (
    <DashboardContext
      value={{
        jobs,
        projects,
        selectedJobId,
        selectedJob,
        isLoading,
        setSelectedJobId,
        getJobsByProject,
        updateJob: handleUpdateJob,
        createJob: handleCreateJob,
        createProject: handleCreateProject,
        updateProject: handleUpdateProject,
        deleteProject: handleDeleteProject,
        refreshData,
      }}
    >
      {children}
    </DashboardContext>
  );
}

export function useDashboard() {
  const context = use(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
