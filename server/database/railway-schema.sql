-- Railway MySQL Database Schema
-- Note: Railway already creates a 'railway' database, so we don't need to create it

-- Experience table
CREATE TABLE IF NOT EXISTS experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Experience positions table (for multiple positions at same company)
CREATE TABLE IF NOT EXISTS experience_positions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  experience_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  period VARCHAR(255) NOT NULL,
  technologies TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (experience_id) REFERENCES experience(id) ON DELETE CASCADE
);

-- Experience bullets table (for bullet points of each position)
CREATE TABLE IF NOT EXISTS experience_bullets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  position_id INT NOT NULL,
  bullet_text TEXT NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (position_id) REFERENCES experience_positions(id) ON DELETE CASCADE
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT,
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample experience data (only if not exists)
INSERT IGNORE INTO experience (company, location) VALUES 
('Intel Corporation', 'Chandler, Arizona'),
('Gen Digital Inc. (NortonLifeLock)', 'Tempe, Arizona'),
('Tech Savvy Mobile Co., Ltd.', 'Seoul, Korea');

-- Insert sample positions (only if not exists)
INSERT IGNORE INTO experience_positions (experience_id, title, period, technologies) VALUES 
(1, 'Full-stack Software Engineer', 'November 2024 – July 2025', 'Vue.js, PHP, PostgreSQL, GitHub Actions, RESTful APIs'),
(1, 'Full-stack Software Engineer Graduate Intern', 'January 2024 – October 2024', 'Next.js, Docker, React, Node.js'),
(2, 'Software Engineer II', 'January 2022 – June 2023', 'React, Redux, Adobe Target, NPM, Webpack, JavaScript'),
(2, 'Associate Software Engineer', 'September 2020 - December 2021', 'React, Redux, Immutable.js, CSS, Flexbox, Adobe Analytics, JIRA'),
(3, 'Software Engineer', 'March 2016 – July 2017', 'Angular.js, JavaScript, jQuery, Ajax, Node.js, Bootstrap, MySQL');

-- Insert sample bullets (only if not exists)
INSERT IGNORE INTO experience_bullets (position_id, bullet_text, order_index) VALUES 
(1, 'Built cross-departmental task tracking application using Vue.js and PHP (OOP), optimized PostgreSQL schema to enhance foundry process visibility, reduced query time by 20%, enabled real-time updates through RESTful APIs.', 1),
(1, 'Implemented CI/CD pipeline using GitHub Actions, reduced deployment time by 40%, increased automated test coverage to 95%, ensuring faster and more reliable production releases.', 2),
(1, 'Complied with Intel security protocols to eliminate critical code vulnerabilities, prevented potential service downtime, improved API throughput during overload scenarios.', 3),
(2, 'Migrated legacy internal tools to Next.js, modernized UI/UX and backend logic, improved load speed, achieved 500+ active user adoption within 3 months.', 1),
(2, 'Led Dockerization of team\'s major projects, reduced onboarding setup time from one day to under 2 hours, enabling consistent deployment across development, staging, and production.', 2),
(3, 'Contributed to integrating acquired company (Avast) payment pages into existing eStore platform using React + Redux, optimized performance and user experience, improved payment conversion rate by 6%.', 1),
(3, 'Implemented JavaScript DOM manipulation scripts in Adobe Target to resolve high-priority production issues during eStore checkout, minimized cart abandonment rates.', 2),
(3, 'Introduced NPM and Webpack to modernize legacy codebase, modularization and bundling, reduced load times and deployment complexity.', 3),
(3, 'Led A/B testing initiatives for payment pages, doubled experiment count and accelerated iteration speed using Adobe Target, made significant contribution to conversion rate increases.', 4),
(4, 'Created various responsive components to enhance Global eStore payment pages using technologies like React, Redux, Immutable.js, CSS, Flexbox.', 1),
(4, 'Refactored Adobe Analytics reporting code into reusable functions, reduced report maintenance time by 50%.', 2),
(4, 'Learned agile methodologies, collaborated cross-functionally with PMs and QA engineers, used JIRA for task management, built strong foundation for cross-team collaboration and iterative development.', 3),
(5, 'Developed voice recognition-based exam module using Angular.js that converts user voice to text and compares with database answers, for practical educational web applications.', 1),
(5, 'Built practical Korean SAT preparation web application with Role-Based Access Control (RBAC), providing secure and personalized access for students and instructors; used JavaScript, jQuery, Ajax, Node.js, Bootstrap, MySQL to improve content delivery speed and user experience.', 2);

