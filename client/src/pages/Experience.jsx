import React from "react";

const Item = ({ role, company, period, bullets }) => (
  <li style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <strong>{role}</strong>
      <span style={{ color: "#6b7280" }}>{period}</span>
    </div>
    <div style={{ color: "#374151", marginTop: 4 }}>{company}</div>
    <ul style={{ marginTop: 8 }}>
      {bullets.map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  </li>
);

export default function Experience() {
  const items = [
    {
      role: "Full‑Stack Software Engineer",
      company: "Intel",
      period: "2024–2025",
      bullets: [
        "Built internal Vue + PHP apps, automated CI/CD and improved deployment reliability.",
        "Designed SQL schemas and optimized queries for reporting workloads."
      ]
    },
    {
      role: "Frontend Engineer",
      company: "Gen Digital (NortonLifeLock)",
      period: "2019–2022",
      bullets: [
        "Led React frontend architecture for A/B testing; doubled experiment throughput.",
        "Integrated acquired product pages and unified design system."
      ]
    }
  ];

  return (
    <section>
      <h1 style={{ marginTop: 0 }}>Experience</h1>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {items.map((it, idx) => <Item key={idx} {...it} />)}
      </ul>
    </section>
  );
}
