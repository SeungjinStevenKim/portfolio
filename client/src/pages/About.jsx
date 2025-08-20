import React from "react";

export default function About() {
  return (
    <section className="section card" id="about">
      <h1>About</h1>
      <p>
        I’m a software engineer specializing in building performant, accessible web apps.
        I’ve led A/B testing architecture, integrated complex product surfaces, and improved
        developer experience with CI/CD and tooling.
      </p>
      <div className="grid cols-2" style={{ marginTop: 8 }}>
        <div className="card">
          <strong>Core</strong>
          <div style={{ marginTop: 8, color: "#9ca3af" }}>
            React, TypeScript/JavaScript, Node/Express, HTML/CSS
          </div>
        </div>
        <div className="card">
          <strong>Also</strong>
          <div style={{ marginTop: 8, color: "#9ca3af" }}>
            Vue, PHP, SQL/NoSQL, Docker, CI/CD, Testing
          </div>
        </div>
      </div>
    </section>
  );
}
