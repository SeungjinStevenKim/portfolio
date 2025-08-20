import React from "react";
import { NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const linkClass = ({ isActive }) =>
  isActive ? "active" : undefined;

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="name">Seungjin Kim</div>
      <div className="title">Software Engineer • Frontend / Full‑Stack</div>

      <nav className="nav">
        <NavLink to="/" className={linkClass} end>About</NavLink>
        <NavLink to="/projects" className={linkClass}>Projects</NavLink>
        <NavLink to="/experience" className={linkClass}>Experience</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
      </nav>

      <div className="grid" style={{ gap: 8, marginTop: 10 }}>
        <a className="badge" href="https://github.com" target="_blank" rel="noreferrer">
          <FaGithub style={{ verticalAlign: "-2px", marginRight: 6 }} /> GitHub
        </a>
        <a className="badge" href="https://www.linkedin.com/in/seungjin-kim-98b08217a/" target="_blank" rel="noreferrer">
          <FaLinkedin style={{ verticalAlign: "-2px", marginRight: 6 }} /> LinkedIn
        </a>
        <a className="badge" href="mailto:kim.seungjin1221@gmail.com">
          <FaEnvelope style={{ verticalAlign: "-2px", marginRight: 6 }} /> Email
        </a>
      </div>

      <div style={{ marginTop: 14, color: "#9ca3af", fontSize: 12, lineHeight: 1.6 }}>
        <div>Location: Laramie, WY</div>
        <div>Open to: Remote / CO / AZ</div>
      </div>
    </aside>
  );
}
