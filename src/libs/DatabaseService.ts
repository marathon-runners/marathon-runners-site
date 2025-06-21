import type { Job } from '@/types/Job';
import { and, desc, eq } from 'drizzle-orm';
import {
  hardwarePricingSchema,
  jobsSchema,
  monitoringSchema,
  projectsSchema,
} from '@/models/Schema';
import { db } from './DB';

export type Project = {
  id: number;
  name: string;
  userId: string;
  description?: string;
  budget?: number;
  isDefault?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type DbJob = {
  id: number;
  projectId: number | null;
  name: string;
  description?: string | null;
  status: string;
  progress: number | null;
  hardwareType: string;
  region: string;
  cpuCores?: number | null;
  memoryGb?: number | null;
  gpuType?: string | null;
  gpuCount?: number | null;
  storageGb?: number | null;
  costPerHour?: string | null;
  totalCost?: string | null;
  estimatedDuration?: number | null;
  estimatedCompletion?: Date | null;
  dockerImage?: string | null;
  command?: string | null;
  environmentVars?: string | null;
  notifications?: any;
  autoScaling?: any;
  startedAt?: Date | null;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type MonitoringData = {
  id: number;
  jobId: number | null;
  cpuUsage?: number;
  memoryUsage?: number;
  gpuUsage?: number;
  networkIn?: number;
  networkOut?: number;
  diskUsage?: number;
  timestamp: Date;
};

export type HardwarePricing = {
  id: number;
  hardwareType: string;
  region: string;
  pricePerHour: number;
  availability?: number;
  lastUpdated: Date;
};

// Helper function to convert database job to frontend Job type
function dbJobToJob(dbJob: DbJob): Job {
  const calculateRuntime = (
    startedAt?: Date | null,
    completedAt?: Date | null,
    status?: string,
  ) => {
    if (!startedAt) {
      return '0h 0m';
    }

    const endTime
      = completedAt || (status === 'running' ? new Date() : startedAt);
    const diffMs = endTime.getTime() - startedAt.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  return {
    id: dbJob.id,
    name: dbJob.name,
    description: dbJob.description || undefined,
    status: dbJob.status as Job['status'],
    progress: dbJob.progress || 0,
    projectId: dbJob.projectId || 0,
    startedAt: dbJob.startedAt?.toISOString() || null,
    estimatedCompletion: dbJob.estimatedCompletion?.toISOString() || null,
    hardwareType: dbJob.hardwareType,
    region: dbJob.region,
    costPerHour: dbJob.costPerHour ? Number(dbJob.costPerHour) : 0,
    totalCost: dbJob.totalCost ? Number(dbJob.totalCost) : 0,
    runtime: calculateRuntime(dbJob.startedAt, dbJob.completedAt, dbJob.status),
    notifications: dbJob.notifications || {
      emailOnCompletion: false,
      emailOnFailure: false,
      slackNotifications: false,
    },
    autoScaling: dbJob.autoScaling || {
      enabled: false,
      minInstances: 1,
      maxInstances: 1,
    },
  };
}

// Project functions
export async function getProjectsByUserId(userId: string): Promise<Project[]> {
  const projects = await db
    .select()
    .from(projectsSchema)
    .where(eq(projectsSchema.userId, userId))
    .orderBy(desc(projectsSchema.isDefault), projectsSchema.name);

  return projects.map(p => ({
    id: p.id,
    name: p.name,
    userId: p.userId,
    description: p.description || undefined,
    budget: p.budget ? Number(p.budget) : undefined,
    isDefault: p.isDefault || false,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));
}

export async function createProject(data: {
  name: string;
  userId: string;
  description?: string;
  budget?: number;
  isDefault?: boolean;
}): Promise<Project> {
  const [project] = await db
    .insert(projectsSchema)
    .values({
      name: data.name,
      userId: data.userId,
      description: data.description,
      budget: data.budget?.toString(),
      isDefault: data.isDefault,
    })
    .returning();

  if (!project) {
    throw new Error('Failed to create project');
  }

  return {
    id: project.id,
    name: project.name,
    userId: project.userId,
    description: project.description || undefined,
    budget: project.budget ? Number(project.budget) : undefined,
    isDefault: project.isDefault || false,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

export async function updateProject(
  id: number,
  data: {
    name?: string;
    description?: string;
    budget?: number;
  },
): Promise<void> {
  await db
    .update(projectsSchema)
    .set({
      name: data.name,
      description: data.description,
      budget: data.budget?.toString(),
      updatedAt: new Date(),
    })
    .where(eq(projectsSchema.id, id));
}

export async function deleteProject(id: number): Promise<void> {
  // First delete all jobs in the project
  await db.delete(jobsSchema).where(eq(jobsSchema.projectId, id));

  // Then delete the project
  await db.delete(projectsSchema).where(eq(projectsSchema.id, id));
}

// Job functions
export async function getJobsByUserId(userId: string): Promise<Job[]> {
  const jobs = await db
    .select({
      job: jobsSchema,
      project: projectsSchema,
    })
    .from(jobsSchema)
    .leftJoin(projectsSchema, eq(jobsSchema.projectId, projectsSchema.id))
    .where(eq(projectsSchema.userId, userId))
    .orderBy(desc(jobsSchema.createdAt));

  return jobs
    .filter(({ project }) => project !== null)
    .map(({ job }) => dbJobToJob(job as DbJob));
}

export async function getJobsByProjectId(projectId: number): Promise<Job[]> {
  const jobs = await db
    .select()
    .from(jobsSchema)
    .where(eq(jobsSchema.projectId, projectId))
    .orderBy(desc(jobsSchema.createdAt));

  return jobs.map(job => dbJobToJob(job as DbJob));
}

export async function getJobById(id: number): Promise<Job | null> {
  const [job] = await db.select().from(jobsSchema).where(eq(jobsSchema.id, id));

  return job ? dbJobToJob(job as DbJob) : null;
}

export async function createJob(data: {
  projectId: number;
  name: string;
  description?: string;
  hardwareType: string;
  region: string;
  costPerHour?: number;
  notifications?: any;
  autoScaling?: any;
}): Promise<Job> {
  const [job] = await db
    .insert(jobsSchema)
    .values({
      projectId: data.projectId,
      name: data.name,
      description: data.description,
      hardwareType: data.hardwareType,
      region: data.region,
      costPerHour: data.costPerHour?.toString(),
      notifications: data.notifications,
      autoScaling: data.autoScaling,
      status: 'pending',
      progress: 0,
    })
    .returning();

  return dbJobToJob(job as DbJob);
}

export async function updateJob(
  id: number,
  data: Partial<{
    name: string;
    description: string;
    status: string;
    progress: number;
    totalCost: number;
    startedAt: Date;
    completedAt: Date;
    estimatedCompletion: Date;
    notifications: any;
    autoScaling: any;
  }>,
): Promise<void> {
  await db
    .update(jobsSchema)
    .set({
      ...data,
      totalCost: data.totalCost?.toString(),
      updatedAt: new Date(),
    })
    .where(eq(jobsSchema.id, id));
}

export async function deleteJob(id: number): Promise<void> {
  // First delete monitoring data
  await db.delete(monitoringSchema).where(eq(monitoringSchema.jobId, id));

  // Then delete the job
  await db.delete(jobsSchema).where(eq(jobsSchema.id, id));
}

// Monitoring functions
export async function getLatestMonitoringData(
  jobId: number,
): Promise<MonitoringData | null> {
  const [monitoring] = await db
    .select()
    .from(monitoringSchema)
    .where(eq(monitoringSchema.jobId, jobId))
    .orderBy(desc(monitoringSchema.timestamp))
    .limit(1);

  return monitoring
    ? {
        id: monitoring.id,
        jobId: monitoring.jobId,
        cpuUsage: monitoring.cpuUsage ? Number(monitoring.cpuUsage) : undefined,
        memoryUsage: monitoring.memoryUsage
          ? Number(monitoring.memoryUsage)
          : undefined,
        gpuUsage: monitoring.gpuUsage ? Number(monitoring.gpuUsage) : undefined,
        networkIn: monitoring.networkIn
          ? Number(monitoring.networkIn)
          : undefined,
        networkOut: monitoring.networkOut
          ? Number(monitoring.networkOut)
          : undefined,
        diskUsage: monitoring.diskUsage
          ? Number(monitoring.diskUsage)
          : undefined,
        timestamp: monitoring.timestamp,
      }
    : null;
}

export async function insertMonitoringData(data: {
  jobId: number;
  cpuUsage?: number;
  memoryUsage?: number;
  gpuUsage?: number;
  networkIn?: number;
  networkOut?: number;
  diskUsage?: number;
}): Promise<void> {
  await db.insert(monitoringSchema).values({
    jobId: data.jobId,
    cpuUsage: data.cpuUsage?.toString(),
    memoryUsage: data.memoryUsage?.toString(),
    gpuUsage: data.gpuUsage?.toString(),
    networkIn: data.networkIn?.toString(),
    networkOut: data.networkOut?.toString(),
    diskUsage: data.diskUsage?.toString(),
  });
}

// Hardware pricing functions
export async function getHardwarePricing(): Promise<HardwarePricing[]> {
  const pricing = await db
    .select()
    .from(hardwarePricingSchema)
    .orderBy(hardwarePricingSchema.hardwareType, hardwarePricingSchema.region);

  return pricing.map(p => ({
    id: p.id,
    hardwareType: p.hardwareType,
    region: p.region,
    pricePerHour: Number(p.pricePerHour),
    availability: p.availability ? Number(p.availability) : undefined,
    lastUpdated: p.lastUpdated,
  }));
}

export async function getHardwarePricingByTypeAndRegion(
  hardwareType: string,
  region: string,
): Promise<HardwarePricing | null> {
  const [pricing] = await db
    .select()
    .from(hardwarePricingSchema)
    .where(
      and(
        eq(hardwarePricingSchema.hardwareType, hardwareType),
        eq(hardwarePricingSchema.region, region),
      ),
    );

  return pricing
    ? {
        id: pricing.id,
        hardwareType: pricing.hardwareType,
        region: pricing.region,
        pricePerHour: Number(pricing.pricePerHour),
        availability: pricing.availability
          ? Number(pricing.availability)
          : undefined,
        lastUpdated: pricing.lastUpdated,
      }
    : null;
}
