import React from 'react';

export default function AdminTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-8">
      <button
        onClick={() => setActiveTab('experience')}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === 'experience'
            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
        }`}
      >
        Experience
      </button>
      <button
        onClick={() => setActiveTab('projects')}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === 'projects'
            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
        }`}
      >
        Projects
      </button>
    </div>
  );
}
