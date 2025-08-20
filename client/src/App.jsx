import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  padding: "8px 12px",
  borderRadius: 10,
  textDecoration: "none",
  color: isActive ? "#111" : "#374151",
  background: isActive ? "#e5e7eb" : "transparent"
});

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100dvh", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
      <header style={{ borderBottom: "1px solid #e5e7eb", background: "#fafafa" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "16px 16px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontWeight: 700 }}>Your Name</div>
          <nav style={{ display: "flex", gap: 8 }}>
            <NavLink to="/" style={linkStyle} end>About</NavLink>
            <NavLink to="/projects" style={linkStyle}>Projects</NavLink>
            <NavLink to="/experience" style={linkStyle}>Experience</NavLink>
            <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: 16 }}>
        <Outlet />
      </main>

      <footer style={{ borderTop: "1px solid #e5e7eb", background: "#fafafa" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: 16, fontSize: 12, color: "#6b7280" }}>
          © {new Date().getFullYear()} Your Name — Built with React + Vite
        </div>
      </footer>
    </div>
  );
}
