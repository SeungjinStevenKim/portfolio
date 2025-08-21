// client/src/components/Sidebar.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaMoon, FaSun, FaTimes, FaCog } from "react-icons/fa";

export default function Sidebar({ onClose }) {
  const [activeSection, setActiveSection] = React.useState('about');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    // 모바일에서 사이드바 닫기
    if (onClose) {
      onClose();
    }
  };

  const navClass = (sectionId) => {
    const isActive = activeSection === sectionId;
    return isActive
      ? `nav-item nav-item-${sectionId} nav-item-active`
      : `nav-item nav-item-${sectionId}`;
  };
  const [dark, setDark] = React.useState(
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true
  );

  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <aside className="sticky top-6 self-start rounded-2xl border border-slate-200/60 bg-white/90 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Profile Section */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-slate-200 dark:border-slate-700 shadow-lg">
          <img
            src="/profile.jpg"
            alt="Seungjin Kim"
            className="h-full w-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 text-white" style={{ display: 'none' }}>
            <span className="text-2xl font-bold">SK</span>
          </div>
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">Seungjin Kim</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Software Engineer</p>
        
        {/* Admin Button */}
        <a
          className="pill w-full justify-center mt-3 text-xs"
          href="/admin"
        >
          <FaCog /> Admin Panel
        </a>
      </div>

      {/* Theme Toggle Button */}
      <div className="flex justify-start mb-4">
        <button
          className="btn-icon"
          aria-label="Toggle theme"
          onClick={() => setDark((v) => !v)}
          title={dark ? "Switch to light" : "Switch to dark"}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* 모바일 헤더(닫기) */}
      <div className="mb-6 flex items-center justify-between md:hidden">
        <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Seungjin Kim</div>
        <button
          className="btn-icon"
          aria-label="Close navigation"
          onClick={() => onClose?.()}
        >
          <FaTimes />
        </button>
      </div>

      {/* 데스크톱 헤더 */}
      <div className="hidden md:block mb-8">
        <div className="mb-4">
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
            Seungjin Kim
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Full-stack software engineer passionate about continuous growth and innovation in technology.
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Navigation
        </div>
        <div className="flex flex-col space-y-1">
          <button onClick={() => scrollToSection('about')} className={navClass('about')}>
            About
          </button>
          <button onClick={() => scrollToSection('experience')} className={navClass('experience')}>
            Experience
          </button>
          <button onClick={() => scrollToSection('projects')} className={navClass('projects')}>
            Projects
          </button>
        </div>
      </nav>

      {/* Connect */}
      <div>
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Connect
        </div>
        <div className="flex flex-col space-y-2">
          <a
            className="pill w-full justify-start"
            href="https://github.com/yourname"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub /> GitHub
          </a>
          <a
            className="pill w-full justify-start"
            href="https://www.linkedin.com/in/seungjin-kim-98b08217a/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            className="pill w-full justify-start"
            href="mailto:kim.seungjin1221@gmail.com"
          >
            <FaEnvelope /> Email
          </a>
        </div>
      </div>
    </aside>
  );
}
