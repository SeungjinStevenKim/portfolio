import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";

export default function App() {
  return (
    <div className="container">
      <Sidebar />
      <main className="grid" style={{ gap: 20 }}>
        <Outlet />
        <div className="footer">© {new Date().getFullYear()} Your Name — Built with React + Vite</div>
      </main>
    </div>
  );
}
