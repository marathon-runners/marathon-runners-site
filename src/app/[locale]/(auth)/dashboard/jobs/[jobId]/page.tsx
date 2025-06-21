type JobDetailProps = {
  params: Promise<{ jobId: string; locale: string }>;
};

export default async function JobDetail(props: JobDetailProps) {
  const { jobId } = await props.params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Job:
        {jobId}
      </h1>

      {/* TODO: Job status and controls */}
      {/* TODO: Job configuration display */}
      {/* TODO: Real-time metrics */}
      {/* TODO: Quick actions (stop, restart, clone) */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Job Information</h2>
          <div className="text-gray-500">
            TODO: Status, hardware, runtime, cost
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="text-gray-500">
            TODO: Stop, restart, clone, delete buttons
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">
          TODO: Job Detail Features
        </h2>
        <ul className="space-y-2">
          <li>• Real-time job status and progress</li>
          <li>• Resource utilization metrics</li>
          <li>• Job configuration and environment</li>
          <li>• Cost tracking and billing details</li>
          <li>• Job control actions</li>
        </ul>
      </div>
    </div>
  );
}
