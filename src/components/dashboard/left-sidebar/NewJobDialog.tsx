'use client';

type Project = {
  id: number;
  name: string;
  isDefault?: boolean;
};

type NewJobDialogProps = {
  isOpen: boolean;
  selectedProjectId: number | null;
  projects: Project[];
  onClose: () => void;
  onCreateJob: (jobData: {
    name: string;
    description: string;
    projectId: number;
  }) => void;
};

export function NewJobDialog({
  isOpen,
  selectedProjectId,
  projects,
  onClose,
  onCreateJob,
}: NewJobDialogProps) {
  if (!isOpen) {
    return null;
  }

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('job-name') as string;
    const description = formData.get('job-description') as string;

    if (name.trim() && selectedProjectId) {
      onCreateJob({
        name: name.trim(),
        description: description.trim(),
        projectId: selectedProjectId,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">
          Create New Job
          {selectedProject && (
            <span className="text-sm text-gray-500 font-normal ml-2">
              in
              {' '}
              {selectedProject.name}
            </span>
          )}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="job-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Name
            </label>
            <input
              id="job-name"
              name="job-name"
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter job name"
            />
          </div>
          <div>
            <label
              htmlFor="job-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="job-description"
              name="job-description"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              rows={3}
              placeholder="Job description (optional)"
            />
          </div>
          <div className="flex gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
