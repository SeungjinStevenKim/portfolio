// client/src/App.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import { FaBars } from "react-icons/fa";

export default function App() {
  const [open, setOpen] = React.useState(false);

  // ESC로 드로어 닫기
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-dvh bg-white text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* 모바일 상단 바 */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-900/80">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          aria-label="Open navigation"
        >
          <FaBars /> Menu
        </button>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 p-5 md:grid-cols-sidebar relative">
        {/* Subtle background pattern - light mode only */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none dark:hidden"></div>
        {/* 데스크톱 사이드바 */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* 모바일 드로어 */}
        <div
          className={[
            "fixed inset-y-0 left-0 z-40 w-80 max-w-[85%] transform p-4 transition-transform duration-200 md:hidden",
            open ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          <Sidebar onClose={() => setOpen(false)} />
        </div>
        {open && (
          <button
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px] md:hidden"
            aria-label="Close overlay"
          />
        )}

        {/* 메인 */}
        <main className="flex flex-col gap-5">
          <Outlet />
          <div className="border-t border-slate-200 pt-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            © {new Date().getFullYear()} Seungjin Kim — Built with React + Express + Tailwind
          </div>
        </main>
      </div>
    </div>
  );
}
