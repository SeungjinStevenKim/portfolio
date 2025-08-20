import React, { useEffect, useState } from "react";

function ProjectCard({ title, desc, stack, url }) {
  return (
    <article className="card" style={{ display: "grid", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <a href={url} target="_blank" rel="noreferrer" className="badge">Open</a>
      </div>
      {desc ? <p style={{ margin: 0, color: "#9ca3af" }}>{desc}</p> : null}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
        {stack.map((s, i) => <span key={i} className="badge">{s}</span>)}
      </div>
    </article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(
        data.map(p => ({ ...p, desc: p.desc ?? "Project description coming soon." }))
      ))
      .catch(console.error);
  }, []);

  return (
    <section className="section" id="projects">
      <h1>Projects</h1>
      <div className="grid cols-2" style={{ marginTop: 8 }}>
        {projects.map(p => (
          <ProjectCard
            key={p.id}
            title={p.title}
            desc={p.desc}
            stack={p.stack}
            url={p.url}
          />
        ))}
      </div>
    </section>
  );
}
