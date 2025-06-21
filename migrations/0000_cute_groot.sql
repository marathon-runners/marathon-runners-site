CREATE TABLE "counter" (
	"id" serial PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hardware_pricing" (
	"id" serial PRIMARY KEY NOT NULL,
	"hardware_type" varchar(100) NOT NULL,
	"region" varchar(100) NOT NULL,
	"price_per_hour" numeric(8, 4) NOT NULL,
	"availability" numeric(5, 2) DEFAULT '100.00',
	"last_updated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"name" varchar(255) NOT NULL,
	"description" text,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"progress" integer DEFAULT 0,
	"hardware_type" varchar(100) NOT NULL,
	"region" varchar(100) NOT NULL,
	"cpu_cores" integer,
	"memory_gb" integer,
	"gpu_type" varchar(100),
	"gpu_count" integer,
	"storage_gb" integer,
	"cost_per_hour" numeric(8, 4),
	"total_cost" numeric(10, 2),
	"estimated_duration_minutes" integer,
	"estimated_completion" timestamp,
	"docker_image" varchar(500),
	"command" text,
	"environment_vars" text,
	"notifications" json,
	"auto_scaling" json,
	"started_at" timestamp,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "monitoring" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_id" integer,
	"cpu_usage" numeric(5, 2),
	"memory_usage" numeric(5, 2),
	"gpu_usage" numeric(5, 2),
	"network_in" numeric(10, 2),
	"network_out" numeric(10, 2),
	"disk_usage" numeric(5, 2),
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"description" text,
	"budget" numeric(10, 2),
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "monitoring" ADD CONSTRAINT "monitoring_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;

-- Insert initial hardware pricing data
INSERT INTO "hardware_pricing" ("hardware_type", "region", "price_per_hour", "availability") VALUES
('NVIDIA A100', 'US-East-1', 2.40, 95.00),
('NVIDIA A100', 'US-West-2', 2.45, 90.00),
('NVIDIA A100', 'EU-Central-1', 2.50, 85.00),
('NVIDIA H100', 'US-East-1', 5.46, 80.00),
('NVIDIA H100', 'US-West-2', 5.50, 75.00),
('NVIDIA H100', 'EU-Central-1', 5.60, 70.00),
('RTX 4090', 'US-East-1', 1.98, 100.00),
('RTX 4090', 'US-West-2', 2.00, 95.00),
('RTX 4090', 'EU-Central-1', 2.05, 90.00),
('Intel Xeon', 'US-East-1', 0.80, 100.00),
('Intel Xeon', 'US-West-2', 0.85, 100.00),
('Intel Xeon', 'EU-Central-1', 0.90, 100.00),
('Intel Xeon', 'Asia-Pacific-1', 0.92, 100.00);

-- Insert sample projects (these will be replaced by user-specific projects)
INSERT INTO "projects" ("name", "user_id", "description", "is_default") VALUES
('Default Project', 'sample-user', 'Your default project for compute jobs', true),
('Research Project', 'sample-user', 'Research and development workloads', false),
('Production Workloads', 'sample-user', 'Production compute tasks', false);

-- Insert sample jobs
INSERT INTO "jobs" ("project_id", "name", "description", "status", "progress", "hardware_type", "region", "cost_per_hour", "total_cost", "started_at", "estimated_completion", "notifications", "auto_scaling") VALUES
(1, 'ML Training Job', 'Training a large language model on customer data', 'running', 65, 'NVIDIA A100', 'US-East-1', 2.40, 15.60, '2024-01-15T10:30:00Z', '2024-01-15T14:45:00Z', '{"emailOnCompletion": true, "emailOnFailure": false, "slackNotifications": false}', '{"enabled": false, "minInstances": 1, "maxInstances": 5}'),
(1, 'Data Processing', 'Processing customer analytics data', 'completed', 100, 'Intel Xeon', 'US-East-1', 0.80, 3.20, '2024-01-15T08:00:00Z', '2024-01-15T12:00:00Z', '{"emailOnCompletion": true, "emailOnFailure": true, "slackNotifications": false}', '{"enabled": false, "minInstances": 1, "maxInstances": 3}'),
(1, 'Model Inference', NULL, 'pending', 0, 'RTX 4090', 'US-West-2', 1.98, 0, NULL, NULL, '{"emailOnCompletion": false, "emailOnFailure": false, "slackNotifications": true}', '{"enabled": true, "minInstances": 2, "maxInstances": 10}'),
(2, 'Simulation Run', 'Running physics simulation for research', 'running', 35, 'NVIDIA H100', 'EU-Central-1', 5.46, 21.84, '2024-01-15T11:15:00Z', '2024-01-15T18:30:00Z', '{"emailOnCompletion": true, "emailOnFailure": true, "slackNotifications": true}', '{"enabled": true, "minInstances": 1, "maxInstances": 8}'),
(2, 'Analysis Job', 'Statistical analysis of experimental data', 'failed', 23, 'NVIDIA A100', 'US-East-1', 2.40, 1.84, '2024-01-15T09:45:00Z', NULL, '{"emailOnCompletion": false, "emailOnFailure": true, "slackNotifications": false}', '{"enabled": false, "minInstances": 1, "maxInstances": 5}'),
(3, 'Batch Processing', 'Batch processing of log files', 'completed', 100, 'Intel Xeon', 'Asia-Pacific-1', 0.92, 5.52, '2024-01-14T20:00:00Z', '2024-01-15T02:00:00Z', '{"emailOnCompletion": true, "emailOnFailure": false, "slackNotifications": false}', '{"enabled": false, "minInstances": 1, "maxInstances": 4}');