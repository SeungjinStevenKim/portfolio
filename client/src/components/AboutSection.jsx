import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="card card-hover fade-in">
      <h1 className="section-title gradient-text">About Me</h1>
      <div className="mt-6 space-y-6">
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
          Hi, I'm <span className="font-semibold text-primary-600 dark:text-primary-400">Seungjin (Steven) Kim</span>, a software engineer
          with over 4 years of experience, including 1.5 years at Intel (including internship) where I worked as a full-stack engineer, and about 3 years at Norton where I specialized in frontend development.
          I specialize in React, Vue.js, Node.js, and cloud technologies, and I'm a collaborative team player
          who enhances overall team productivity. I believe in creating solutions that not only solve technical challenges
          but also make working together more efficient and enjoyable.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-effect rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Technical Skills</h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div><strong className="text-primary-600 dark:text-primary-400">Languages & Frameworks:</strong> JavaScript, React, Redux, Vue.js, Node.js, Express, PHP, HTML5, CSS3, Java, Python</div>
              <div><strong className="text-primary-600 dark:text-primary-400">Tools & Technologies:</strong> Git, Docker, Linux/Unix, Redis, Adobe Target, Webpack, CI/CD, Agile, RESTful APIs, MySQL</div>
              <div><strong className="text-primary-600 dark:text-primary-400">Cloud & DevOps:</strong> AWS (Lambda, S3, EC2), Azure (Functions), GitHub Actions, Docker</div>
            </div>
          </div>
          
          <div className="glass-effect rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Education</h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
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
