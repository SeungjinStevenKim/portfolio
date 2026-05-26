import React from "react";

function ResearchItem({ item }) {
  const key = item?.id ?? item?.title ?? Math.random();

  return (
    <div
      key={key}
      className="rounded-xl border border-slate-200/60 bg-white/50 p-4 dark:border-slate-800/50 dark:bg-slate-900/20"
    >
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
        {item.title}
      </h3>

      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {[item.venue, item.year].filter(Boolean).join(" • ")}
      </div>

      {item.authors && (
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {item.authors}
        </div>
      )}

      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex btn-primary text-xs"
        >
          Paper / Link
        </a>
      )}
    </div>
  );
}

export default function ResearchSection({ research }) {
  const accepted = research?.accepted ?? [];
  const onReview = research?.on_review ?? [];

  return (
    <section id="research" className="card card-hover slide-up">
      <h1 className="section-title gradient-text">Research</h1>

      <div className="mt-6 space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Publications
          </h2>

          {accepted.length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              No accepted research added yet.
            </div>
          ) : (
            <div className="space-y-4">
              {accepted.map((item) => (
                <ResearchItem key={item.id ?? item.title} item={item} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
            On the Review
          </h2>

          {onReview.length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              No on-review research added yet.
            </div>
          ) : (
            <div className="space-y-4">
              {onReview.map((item) => (
                <ResearchItem key={item.id ?? item.title} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

