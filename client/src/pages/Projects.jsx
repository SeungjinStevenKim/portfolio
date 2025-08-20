import React, { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h1 style={{ marginTop: 0 }}>Projects</h1>
      {loading ? <p>Loading projects…</p> : null}
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {projects.map((p) => (
          <li key={p.id} style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
            <h3 style={{ margin: "0 0 6px" }}>{p.title}</h3>
            <div style={{ fontSize: 14, color: "#4b5563" }}>
              Tech stack: {p.stack.join(", ")}
            </div>
            <div style={{ marginTop: 8 }}>
              <a href={p.url} target="_blank" rel="noreferrer">Open</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
