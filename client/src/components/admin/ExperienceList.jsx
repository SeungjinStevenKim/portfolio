import React from 'react';

export default function ExperienceList({ experience, loading, startEditExperience, deleteExperience }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Existing Experience</h2>
      
      {loading ? (
        <div className="text-slate-500 dark:text-slate-400">Loading...</div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id} className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{exp.company}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{exp.location}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditExperience(exp)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white text-sm rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {exp.positions.length} positions
              </div>
              <div className="mt-2 space-y-2">
                {exp.positions.map((position, index) => (
                  <div key={index} className="pl-4 border-l-2 border-slate-200 dark:border-slate-600">
                    <div className="font-medium text-slate-800 dark:text-slate-200">{position.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{position.period}</div>
                    {position.technologies && (
                      <div className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                        {position.technologies}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
