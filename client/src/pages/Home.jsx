import React from "react";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import experience from "../data/experience.json";
import projects from "../data/projects.json";

export default function Home() {
  return (
    <div className="space-y-8">
      <AboutSection />
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
    </div>
  );
}
