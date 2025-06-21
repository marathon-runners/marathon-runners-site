type ProjectDetailProps = {
  params: Promise<{ projectId: string; locale: string }>;
};

export default async function ProjectDetail(props: ProjectDetailProps) {
  const { projectId } = await props.params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Project:
        {projectId}
      </h1>

      {/* TODO: Project details and settings */}
      {/* TODO: Jobs list for this project */}
      {/* TODO: Project usage statistics */}
      {/* TODO: Project budget and billing */}

      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">TODO: Project Detail Features</h2>
        <ul className="space-y-2">
          <li>• Project information and settings</li>
          <li>• All jobs within this project</li>
          <li>• Project-specific resource usage</li>
          <li>• Budget tracking and alerts</li>
          <li>• Member permissions</li>
        </ul>
      </div>
    </div>
  );
}
