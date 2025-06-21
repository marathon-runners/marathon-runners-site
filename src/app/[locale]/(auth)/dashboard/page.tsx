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
    <div className="h-full flex">
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Compute Dashboard</h1>
          <p className="text-gray-600">Manage your jobs, projects, and compute resources</p>
        </div>

        {/* TODO: Job Details Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Job Details</h2>
          <div className="text-gray-500">
            TODO: Display selected job information, status, progress
          </div>
        </div>

        {/* TODO: Hardware Selection */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Hardware Configuration</h2>
          <div className="text-gray-500">
            TODO: GPU/CPU selection interface, specifications display
          </div>
        </div>

        {/* TODO: Cost Calculator */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Cost Estimation</h2>
          <div className="text-gray-500">
            TODO: Real-time cost calculation, budget tracking
          </div>
        </div>
      </div>
    </div>
  );
}
