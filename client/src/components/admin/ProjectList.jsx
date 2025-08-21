import React from 'react';

export default function ProjectList({ projects, loading, deleteProject }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Existing Projects</h2>
      
      {loading ? (
        <div className="text-slate-500 dark:text-slate-400">Loading...</div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
                  {project.featured && (
                    <span className="inline-block mt-1 text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white text-sm rounded"
                >
                  Delete
                </button>
              </div>
              {project.technologies && (
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  <strong>Technologies:</strong> {project.technologies}
                </div>
              )}
              <div className="flex gap-2 mt-2">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    GitHub
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
