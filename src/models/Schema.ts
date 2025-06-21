import { boolean, decimal, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

// Need a database for production? Check out https://www.prisma.io/?via=nextjsboilerplate
// Tested and compatible with Next.js Boilerplate

// Compute Platform Database Schema

export const projectsSchema = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  description: text('description'),
  budget: decimal('budget', { precision: 10, scale: 2 }),
  isDefault: boolean('is_default').default(false),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const jobsSchema = pgTable('jobs', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projectsSchema.id),
  name: varchar('name', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // 'pending', 'running', 'completed', 'failed', 'stopped'
  hardwareType: varchar('hardware_type', { length: 100 }).notNull(),
  region: varchar('region', { length: 100 }).notNull(),
  cpuCores: integer('cpu_cores'),
  memoryGb: integer('memory_gb'),
  gpuType: varchar('gpu_type', { length: 100 }),
  gpuCount: integer('gpu_count'),
  storageGb: integer('storage_gb'),
  costPerHour: decimal('cost_per_hour', { precision: 8, scale: 4 }),
  totalCost: decimal('total_cost', { precision: 10, scale: 2 }),
  estimatedDuration: integer('estimated_duration_minutes'),
  dockerImage: varchar('docker_image', { length: 500 }),
  command: text('command'),
  environmentVars: text('environment_vars'), // JSON string
  startedAt: timestamp('started_at', { mode: 'date' }),
  completedAt: timestamp('completed_at', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const monitoringSchema = pgTable('monitoring', {
  id: serial('id').primaryKey(),
  jobId: integer('job_id').references(() => jobsSchema.id),
  cpuUsage: decimal('cpu_usage', { precision: 5, scale: 2 }),
  memoryUsage: decimal('memory_usage', { precision: 5, scale: 2 }),
  gpuUsage: decimal('gpu_usage', { precision: 5, scale: 2 }),
  networkIn: decimal('network_in', { precision: 10, scale: 2 }),
  networkOut: decimal('network_out', { precision: 10, scale: 2 }),
  diskUsage: decimal('disk_usage', { precision: 5, scale: 2 }),
  timestamp: timestamp('timestamp', { mode: 'date' }).defaultNow().notNull(),
});

export const hardwarePricingSchema = pgTable('hardware_pricing', {
  id: serial('id').primaryKey(),
  hardwareType: varchar('hardware_type', { length: 100 }).notNull(),
  region: varchar('region', { length: 100 }).notNull(),
  pricePerHour: decimal('price_per_hour', { precision: 8, scale: 4 }).notNull(),
  availability: decimal('availability', { precision: 5, scale: 2 }).default('100.00'), // percentage
  lastUpdated: timestamp('last_updated', { mode: 'date' }).defaultNow().notNull(),
});

// Legacy counter schema (keeping for migration compatibility)
export const counterSchema = pgTable('counter', {
  id: serial('id').primaryKey(),
  count: integer('count').default(0),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});
