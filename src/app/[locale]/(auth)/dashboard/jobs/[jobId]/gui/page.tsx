type GUIProps = {
  params: Promise<{ jobId: string; locale: string }>;
};

export default async function GUI(props: GUIProps) {
  const { jobId } = await props.params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Remote GUI - Job
        {jobId}
      </h1>

      {/* TODO: Remote desktop interface */}
      {/* TODO: VNC/RDP connection */}
      {/* TODO: GUI application launcher */}
      {/* TODO: Screen sharing controls */}

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Remote Desktop</h2>
          <div className="text-gray-500">TODO: Connection controls</div>
        </div>

        <div className="border-2 border-gray-300 rounded p-4 h-96 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg font-semibold mb-4">
              TODO: Remote GUI Interface
            </div>
            <ul className="space-y-2">
              <li>• VNC/RDP remote desktop connection</li>
              <li>• Full-screen mode support</li>
              <li>• Keyboard and mouse input</li>
              <li>• Clipboard synchronization</li>
              <li>• Screen resolution adjustment</li>
              <li>• Multiple monitor support</li>
              <li>• Session recording</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
