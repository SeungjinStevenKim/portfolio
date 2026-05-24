import React from 'react';

export default function ExperienceSection({ experience }) {
  return (
    <section id="experience" className="card card-hover slide-up">
      <h1 className="section-title gradient-text">Experience</h1>

      {experience.length === 0 && (
        <div className="mt-4 text-slate-500 dark:text-slate-400">
          No experience data available.
        </div>
      )}

      {experience.length > 0 && (
        <ul className="mt-6 grid gap-6">
          {experience.map((company, companyIndex) => (
            <li key={company.id} className="scale-in" style={{ animationDelay: `${companyIndex * 0.2}s` }}>
              <div className="card card-hover">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    {company.company}
                  </h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                    {company.location}
                  </p>
                </div>
                <div className="space-y-6">
                  {company.positions.map((position, index) => (
                    <div key={index} className="border-l-2 border-primary-300 dark:border-primary-600 pl-6 relative">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <strong className="text-lg text-slate-800 dark:text-slate-200">
                          {position.title}
                        </strong>
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                          {position.period}
                        </span>
                      </div>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                        {position.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start gap-2">
                            <span className="text-primary-500 mt-2 flex-shrink-0">▹</span>
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      {position.technologies && (
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {position.technologies.split(',').map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="pill text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
