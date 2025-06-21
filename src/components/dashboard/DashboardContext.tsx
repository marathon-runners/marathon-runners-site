'use client';

import type { ReactNode } from 'react';
import { createContext, use, useState } from 'react';

// Mock jobs data
export const mockJobs = [
  {
    id: 1,
    name: 'ML Training Job',
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
  },
  {
    id: 2,
    name: 'Data Processing',
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
  },
  {
    id: 4,
    name: 'Simulation Run',
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
  },
  {
    id: 5,
    name: 'Analysis Job',
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
  },
  {
    id: 6,
    name: 'Batch Processing',
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

export type Job = typeof mockJobs[0];
export type Project = typeof mockProjects[0];

type DashboardContextType = {
  jobs: Job[];
  projects: Project[];
  selectedJobId: number | null;
  selectedJob: Job | null;
  setSelectedJobId: (jobId: number | null) => void;
  getJobsByProject: (projectId: number) => Job[];
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(1); // Default to first job

  const selectedJob = mockJobs.find(job => job.id === selectedJobId) || null;

  const getJobsByProject = (projectId: number) => {
    return mockJobs.filter(job => job.projectId === projectId);
  };

  return (
    <DashboardContext
      value={{
        jobs: mockJobs,
        projects: mockProjects,
        selectedJobId,
        selectedJob,
        setSelectedJobId,
        getJobsByProject,
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
