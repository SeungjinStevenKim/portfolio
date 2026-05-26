import React from "react";
import AboutSection from "../components/AboutSection";
import ResearchSection from "../components/ResearchSection";
import ExperienceSection from "../components/ExperienceSection";

import experience from "../data/experience.json";
import research from "../data/research.json";

export default function Home() {
  return (
    <div className="space-y-8">
      <AboutSection />
      <ResearchSection research={research} />
      <ExperienceSection experience={experience} />
    </div>
  );
}
