'use client';

type NewProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (projectData: { name: string; description: string }) => void;
};

export function NewProjectDialog({
  isOpen,
  onClose,
  onCreateProject,
}: NewProjectDialogProps) {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('project-name') as string;
    const description = formData.get('project-description') as string;

    if (name.trim()) {
      onCreateProject({
        name: name.trim(),
        description: description.trim(),
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              id="project-name"
              name="project-name"
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter project name"
            />
          </div>
          <div>
            <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="project-description"
              name="project-description"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              rows={3}
              placeholder="Project description (optional)"
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
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
