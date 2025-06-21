import { CostCalculator } from '@/components/dashboard/CostCalculator';
import { HardwareSelector } from '@/components/dashboard/HardwareSelector';
import { JobDetails } from '@/components/dashboard/JobDetails';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  return {
    title: 'Dashboard - Compute Platform',
    description: 'Manage your compute jobs and resources',
  };
}

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Compute Dashboard</h1>
        <p className="text-gray-600">Manage your jobs, projects, and compute resources</p>
      </div>

      {/* Job Details Section */}
      <JobDetails />

      {/* Hardware Selection and Cost Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HardwareSelector />
        <CostCalculator />
      </div>
    </div>
  );
}
