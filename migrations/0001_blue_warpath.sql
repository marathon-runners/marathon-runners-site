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
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
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
	"docker_image" varchar(500),
	"command" text,
	"environment_vars" text,
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