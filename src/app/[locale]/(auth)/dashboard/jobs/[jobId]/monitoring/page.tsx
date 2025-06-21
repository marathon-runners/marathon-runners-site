type MonitoringProps = {
  params: Promise<{ jobId: string; locale: string }>;
};

export default async function Monitoring(props: MonitoringProps) {
  const { jobId } = await props.params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Monitoring - Job
        {jobId}
      </h1>

      {/* TODO: Real-time monitoring graphs */}
      {/* TODO: CPU/GPU/Memory usage charts */}
      {/* TODO: Network I/O metrics */}
      {/* TODO: Custom metrics dashboard */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">CPU Usage</h2>
          <div className="text-gray-500">TODO: CPU utilization chart</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">GPU Usage</h2>
          <div className="text-gray-500">TODO: GPU utilization chart</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Memory Usage</h2>
          <div className="text-gray-500">TODO: Memory usage chart</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Network I/O</h2>
          <div className="text-gray-500">TODO: Network throughput chart</div>
        </div>
      </div>
    </div>
  );
}
