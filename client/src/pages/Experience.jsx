import React from "react";

function Role({ role, company, period, bullets }) {
  return (
    <li className="card" style={{ listStyle: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <strong>{role}</strong>
        <span style={{ color: "#9ca3af" }}>{period}</span>
      </div>
      <div style={{ color: "#e5e7eb", marginTop: 4 }}>{company}</div>
      <ul style={{ marginTop: 8, color: "#cbd5e1" }}>
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </li>
  );
}

export default function Experience() {
  const items = [
    {
      role: "Full‑Stack Software Engineer",
      company: "Intel",
      period: "2024–2025",
      bullets: [
        "Built internal Vue + PHP apps, automated CI/CD; improved release reliability.",
        "Designed SQL schemas and optimized queries for reporting workloads."
      ]
    },
    {
      role: "Frontend Engineer",
      company: "Gen Digital (NortonLifeLock)",
      period: "2019–2022",
      bullets: [
        "Led React A/B testing architecture; doubled experiment throughput.",
        "Integrated acquired product pages; unified design system."
      ]
    }
  ];

  return (
    <section className="section" id="experience">
      <h1>Experience</h1>
      <ul className="grid" style={{ padding: 0, gap: 12, marginTop: 8 }}>
        {items.map((it, i) => <Role key={i} {...it} />)}
      </ul>
    </section>
  );
}
