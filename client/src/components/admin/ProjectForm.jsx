import React from 'react';

export default function ProjectForm({ projForm, setProjForm, addProject }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Add New Project</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={projForm.title}
          onChange={(e) => setProjForm({...projForm, title: e.target.value})}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        
        <textarea
          placeholder="Project Description"
          value={projForm.description}
          onChange={(e) => setProjForm({...projForm, description: e.target.value})}
          rows={4}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
        />
        
        <input
          type="text"
          placeholder="Technologies (comma separated)"
          value={projForm.technologies}
          onChange={(e) => setProjForm({...projForm, technologies: e.target.value})}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        
        <input
          type="url"
          placeholder="GitHub URL"
          value={projForm.github_url}
          onChange={(e) => setProjForm({...projForm, github_url: e.target.value})}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        
        <input
          type="url"
          placeholder="Live URL"
          value={projForm.live_url}
          onChange={(e) => setProjForm({...projForm, live_url: e.target.value})}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        
        <input
          type="url"
          placeholder="Image URL"
          value={projForm.image_url}
          onChange={(e) => setProjForm({...projForm, image_url: e.target.value})}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={projForm.featured}
              onChange={(e) => setProjForm({...projForm, featured: e.target.checked})}
              className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">Featured Project</span>
          </label>
        </div>
        
        <input
          type="number"
          placeholder="Order Index"
          value={projForm.order_index}
          onChange={(e) => setProjForm({...projForm, order_index: parseInt(e.target.value) || 0})}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        
        <button
          onClick={addProject}
          className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
        >
          Add Project
        </button>
      </div>
    </div>
  );
}
