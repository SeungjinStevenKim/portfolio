// client/src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let ignore = false;
    
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        
        // Projects 데이터 가져오기
        const projectsResponse = await fetch(`${apiUrl}/api/projects`);
        if (!projectsResponse.ok) throw new Error(`Projects HTTP ${projectsResponse.status}`);
        const projectsData = await projectsResponse.json();
        
        // Experience 데이터 가져오기
        const experienceResponse = await fetch(`${apiUrl}/api/experience`);
        if (!experienceResponse.ok) throw new Error(`Experience HTTP ${experienceResponse.status}`);
        const experienceData = await experienceResponse.json();
        
        if (!ignore) {
          setProjects(
            (projectsData ?? []).map((p) => ({
              ...p,
              desc: p.desc ?? "Project description coming soon."
            }))
          );
          setExperience(experienceData ?? []);
        }
      } catch (e) {
        if (!ignore) setErr(e.message || "Failed to load data");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="space-y-8">
      <AboutSection />
      <ExperienceSection experience={experience} loading={loading} err={err} />
      <ProjectsSection projects={projects} loading={loading} err={err} />
    </div>
  );
}
