'use client';

import type { ReactNode } from 'react';
import type { Job } from '@/types/Job';

import { createContext, use, useState } from 'react';

// Mock jobs data
export const mockJobs: Job[] = [
  {
    id: 1,
    name: 'ML Training Job',
    description: 'Training a large language model on customer data',
    status: 'running' as const,
    progress: 65,
    projectId: 1,
    startedAt: '2024-01-15T10:30:00Z',
    estimatedCompletion: '2024-01-15T14:45:00Z',
    hardwareType: 'NVIDIA A100',
    region: 'US-East-1',
    costPerHour: 2.40,
    totalCost: 15.60,
    runtime: '6h 30m',
    notifications: {
      emailOnCompletion: true,
      emailOnFailure: false,
      slackNotifications: false,
    },
    autoScaling: {
      enabled: false,
      minInstances: 1,
      maxInstances: 5,
    },
  },
  {
    id: 2,
    name: 'Data Processing',
    description: 'Processing customer analytics data',
    status: 'completed' as const,
    progress: 100,
    projectId: 1,
    startedAt: '2024-01-15T08:00:00Z',
    estimatedCompletion: '2024-01-15T12:00:00Z',
    hardwareType: 'Intel Xeon',
    region: 'US-East-1',
    costPerHour: 0.80,
    totalCost: 3.20,
    runtime: '4h 0m',
    notifications: {
      emailOnCompletion: true,
      emailOnFailure: true,
      slackNotifications: false,
    },
    autoScaling: {
      enabled: false,
      minInstances: 1,
      maxInstances: 3,
    },
  },
  {
    id: 3,
    name: 'Model Inference',
    status: 'pending' as const,
    progress: 0,
    projectId: 1,
    startedAt: null,
    estimatedCompletion: null,
    hardwareType: 'RTX 4090',
    region: 'US-West-2',
    costPerHour: 1.98,
    totalCost: 0,
    runtime: '0h 0m',
    notifications: {
      emailOnCompletion: false,
      emailOnFailure: false,
      slackNotifications: true,
    },
    autoScaling: {
      enabled: true,
      minInstances: 2,
      maxInstances: 10,
    },
  },
  {
    id: 4,
    name: 'Simulation Run',
    description: 'Running physics simulation for research',
    status: 'running' as const,
    progress: 35,
    projectId: 2,
    startedAt: '2024-01-15T11:15:00Z',
    estimatedCompletion: '2024-01-15T18:30:00Z',
    hardwareType: 'NVIDIA H100',
    region: 'EU-Central-1',
    costPerHour: 5.46,
    totalCost: 21.84,
    runtime: '2h 15m',
    notifications: {
      emailOnCompletion: true,
      emailOnFailure: true,
      slackNotifications: true,
    },
    autoScaling: {
      enabled: true,
      minInstances: 1,
      maxInstances: 8,
    },
  },
  {
    id: 5,
    name: 'Analysis Job',
    description: 'Statistical analysis of experimental data',
    status: 'failed' as const,
    progress: 23,
    projectId: 2,
    startedAt: '2024-01-15T09:45:00Z',
    estimatedCompletion: null,
    hardwareType: 'NVIDIA A100',
    region: 'US-East-1',
    costPerHour: 2.40,
    totalCost: 1.84,
    runtime: '0h 46m',
    notifications: {
      emailOnCompletion: false,
      emailOnFailure: true,
      slackNotifications: false,
    },
    autoScaling: {
      enabled: false,
      minInstances: 1,
      maxInstances: 5,
    },
  },
  {
    id: 6,
    name: 'Batch Processing',
    description: 'Batch processing of log files',
    status: 'completed' as const,
    progress: 100,
    projectId: 3,
    startedAt: '2024-01-14T20:00:00Z',
    estimatedCompletion: '2024-01-15T02:00:00Z',
    hardwareType: 'Intel Xeon',
    region: 'Asia-Pacific-1',
    costPerHour: 0.92,
    totalCost: 5.52,
    runtime: '6h 0m',
    notifications: {
      emailOnCompletion: true,
      emailOnFailure: false,
      slackNotifications: false,
    },
    autoScaling: {
      enabled: false,
      minInstances: 1,
      maxInstances: 4,
    },
  },
];

export const mockProjects = [
  {
    id: 1,
    name: 'Default Project',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Research Project',
    isDefault: false,
  },
  {
    id: 3,
    name: 'Production Workloads',
    isDefault: false,
  },
];

export type Project = typeof mockProjects[0];

type DashboardContextType = {
  jobs: Job[];
  projects: Project[];
  selectedJobId: number | null;
  selectedJob: Job | null;
  setSelectedJobId: (jobId: number | null) => void;
  getJobsByProject: (projectId: number) => Job[];
  updateJob: (jobId: number, updates: Partial<Job>) => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(1); // Default to first job

  const selectedJob = jobs.find(job => job.id === selectedJobId) || null;

  const getJobsByProject = (projectId: number) => {
    return jobs.filter(job => job.projectId === projectId);
  };

  const updateJob = (jobId: number, updates: Partial<Job>) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, ...updates } : job,
      ),
    );
  };

  return (
    <DashboardContext
      value={{
        jobs,
        projects: mockProjects,
        selectedJobId,
        selectedJob,
        setSelectedJobId,
        getJobsByProject,
        updateJob,
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
