'use client';

import { TrashIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type Project = {
  id: number;
  name: string;
  isDefault?: boolean;
};

type ProjectSettingsDialogProps = {
  isOpen: boolean;
  selectedProjectId: number | null;
  projects: Project[];
  onClose: () => void;
  onUpdateProject: (
    projectId: number,
    projectData: { name: string; description: string },
  ) => void;
  onDeleteProject: (projectId: number) => void;
};

export function ProjectSettingsDialog({
  isOpen,
  selectedProjectId,
  projects,
  onClose,
  onUpdateProject,
  onDeleteProject,
}: ProjectSettingsDialogProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen || !selectedProjectId) {
    return null;
  }

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  if (!selectedProject) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('edit-project-name') as string;
    const description = formData.get('edit-project-description') as string;

    if (name.trim()) {
      onUpdateProject(selectedProjectId, {
        name: name.trim(),
        description: description.trim(),
      });
      onClose();
    }
  };

  const handleDeleteProject = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDeleteProject(selectedProjectId);
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">
          Project Settings:
          {' '}
          {selectedProject.name}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Details */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Project Details
            </h4>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="edit-project-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Project Name
                </label>
                <input
                  id="edit-project-name"
                  name="edit-project-name"
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue={selectedProject.name}
                />
              </div>
              <div>
                <label
                  htmlFor="edit-project-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="edit-project-description"
                  name="edit-project-description"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                  placeholder="Project description (optional)"
                />
              </div>
            </div>
          </div>

          {/* Team Management */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Team Members
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">user@example.com (Owner)</span>
                </div>
              </div>
              <button
                type="button"
                className="w-full p-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center gap-2"
              >
                <UserPlusIcon className="h-4 w-4" />
                Invite team member
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          {!selectedProject.isDefault && (
            <div>
              <h4 className="text-sm font-medium text-red-900 mb-3">
                Danger Zone
              </h4>
              {showDeleteConfirm
                ? (
                    <div className="space-y-3">
                      <p className="text-sm text-red-700">
                        Are you sure you want to delete this project? This action cannot be undone and all jobs in this project will be deleted.
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={confirmDelete}
                          className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )
                : (
                    <button
                      type="button"
                      onClick={handleDeleteProject}
                      className="w-full p-3 border border-red-300 rounded text-red-700 hover:bg-red-50 flex items-center justify-center gap-2"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete Project
                    </button>
                  )}
              <p className="text-xs text-gray-500 mt-1">
                This action cannot be undone. All jobs in this project will be
                deleted.
              </p>
            </div>
          )}

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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
