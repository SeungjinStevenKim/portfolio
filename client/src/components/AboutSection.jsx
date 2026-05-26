import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="card card-hover fade-in">
      <h1 className="section-title gradient-text">About Me</h1>
      <div className="mt-6 space-y-6">
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
          Hi, I&apos;m <span className="font-semibold text-primary-600 dark:text-primary-400">Seungjin (Steven) Kim</span>, a first-year PhD student at the{" "}
          <span className="font-semibold text-primary-600 dark:text-primary-400">University of Wyoming</span> specializing in{" "}
          <span className="font-semibold text-primary-600 dark:text-primary-400">AI and computer vision</span>, with 4+ years of industry experience in full-stack and frontend software engineering.
          Before starting my PhD, I worked as a full-stack engineer at Intel for 1.5 years, including an internship, and as a frontend engineer at Norton for 3 years.
          I&apos;m particularly interested in building scalable, user-centered AI systems that bridge research and real-world applications.
          I am currently seeking a <span className="font-semibold text-primary-600 dark:text-primary-400">2027 summer internship</span> where I can contribute my software engineering experience and research background in AI/computer vision.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-effect rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Technical Skills</h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div>
                <strong className="text-primary-600 dark:text-primary-400">AI & Data:</strong>{" "}
                PyTorch, NumPy, pandas, scikit-learn, OpenCV
              </div>
              <div>
                <strong className="text-primary-600 dark:text-primary-400">Languages & Frameworks:</strong>{" "}
                JavaScript, React, Redux, Vue.js, Node.js, Express, PHP, HTML5, CSS3, Java, Python
              </div>
              <div>
                <strong className="text-primary-600 dark:text-primary-400">Tools & Technologies:</strong>{" "}
                Git, Docker, Linux/Unix, Redis, Adobe Target, Webpack, CI/CD, Agile, RESTful APIs, MySQL, SQL
              </div>
              <div>
                <strong className="text-primary-600 dark:text-primary-400">Cloud & DevOps:</strong>{" "}
                AWS (Lambda, S3, EC2), Azure (Functions), GitHub Actions, Docker
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Education</h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div>
                <strong className="text-primary-600 dark:text-primary-400">University of Wyoming</strong><br/>
                PhD, Computer Science<br/>
                <span className="text-slate-500">Spring 2026 – present • Laramie, Wyoming</span>
              </div>
              <div>
                <strong className="text-primary-600 dark:text-primary-400">Trine University</strong><br/>
                Master of Science, Information Studies<br/>
                <span className="text-slate-500">Graduated October 2024 • Phoenix, Arizona</span>
              </div>
              <div>
                <strong className="text-primary-600 dark:text-primary-400">Texas A&M University</strong><br/>
                Bachelor of Science, Computer Science<br/>
                <span className="text-slate-500">Graduated May 2020 • College Station, Texas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
