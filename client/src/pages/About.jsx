import React from "react";

export default function About() {
  return (
    <section>
      <h1 style={{ marginTop: 0 }}>About</h1>
      <p style={{ color: "#374151" }}>
        I’m a software engineer focused on frontend and full‑stack development (React, Node, CI/CD).
        I enjoy building fast, accessible web apps and developer tooling that improves team velocity.
      </p>
      <ul style={{ lineHeight: 1.8 }}>
        <li>Core: React, TypeScript/JavaScript, Node/Express</li>
        <li>Also: Vue, PHP, SQL/NoSQL, Docker, CI/CD</li>
        <li>Interests: A/B testing frameworks, performance, DX</li>
      </ul>
    </section>
  );
}
