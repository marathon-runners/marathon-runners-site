// TODO: we should use prisma types (after we create the prisma schema)
export type Job = {
  id: number;
  name: string;
  description?: string;
  status: 'running' | 'completed' | 'pending' | 'failed';
  progress: number;
  projectId: number;
  startedAt: string | null;
  estimatedCompletion: string | null;
  hardwareType: string;
  region: string;
  costPerHour: number;
  totalCost: number;
  runtime: string;
  // Settings
  notifications?: {
    emailOnCompletion: boolean;
    emailOnFailure: boolean;
    slackNotifications: boolean;
  };
  autoScaling?: {
    enabled: boolean;
    minInstances: number;
    maxInstances: number;
  };
};
