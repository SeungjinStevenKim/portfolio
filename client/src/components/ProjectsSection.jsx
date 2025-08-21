import React from 'react';

function ProjectCard({ title, description, technologies, github_url, live_url, image_url, featured }) {
  const techArray = technologies ? technologies.split(',').map(tech => tech.trim()) : [];
  
  return (
    <article className="card card-hover hover-lift group">
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {title}
          {featured && (
            <span className="ml-2 text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </h3>
        <div className="flex gap-2">
          {live_url && (
            <a
              href={live_url}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-xs"
            >
              Live
            </a>
          )}
          {github_url && (
            <a
              href={github_url}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-xs bg-slate-600 hover:bg-slate-700"
            >
              Code
            </a>
          )}
        </div>
      </div>
      {description && (
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{description}</p>
      )}
      {techArray.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {techArray.map((tech, i) => (
            <span
              key={i}
              className="pill text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export default function ProjectsSection({ projects, loading, err }) {
  return (
    <section id="projects" className="card card-hover slide-up">
      <h1 className="section-title gradient-text">Projects</h1>

      {/* 상태 표시 */}
      {loading && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800/50"
            />
          ))}
        </div>
      )}

      {err && !loading && (
        <div className="mt-4 rounded-lg border border-rose-300 bg-rose-50 p-4 text-rose-700 dark:border-rose-900/50 dark:bg-rose-900/20 dark:text-rose-200">
          Failed to load projects: {err}
        </div>
      )}

      {!loading && !err && projects.length === 0 && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Projects Coming Soon!
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            I'm currently working on some exciting projects. Check back soon to see what I've been building!
          </p>
        </div>
      )}

      {!loading && !err && projects.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projects.map((p, index) => (
            <div key={p.id} className="scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProjectCard
                title={p.title}
                description={p.description}
                technologies={p.technologies}
                github_url={p.github_url}
                live_url={p.live_url}
                image_url={p.image_url}
                featured={p.featured}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
