# Seungjin Kim's Portfolio

A modern, responsive portfolio website showcasing my experience and skills as a software engineer.

## 🚀 Live Demo

- **Portfolio**: https://portfolio-zeta-smoky-u4kest6im2.vercel.app/
- **Admin Panel**: `/admin` (Protected with API key)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Icons** - Beautiful SVG icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **mysql2** - MySQL client for Node.js

## ✨ Features

### 🎨 Modern UI/UX
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Smooth Animations** - Fade-in, slide-up, and scale animations
- **Glassmorphism Effects** - Modern translucent design elements

### 📱 Single Page Application
- **Smooth Scrolling** - Navigate between sections seamlessly
- **Static Navigation** - Sidebar with manual section selection
- **Dynamic Navigation** - Responsive sidebar with collapsible sections

### 💼 Content Management
- **Dynamic Experience Display** - Pulls data from MySQL database
- **Real-time Updates** - Changes reflect immediately
- **Admin Panel** - Secure content management interface
- **CRUD Operations** - Create, Read, Update, Delete experience and projects

### 🔐 Admin Features
- **Secure Authentication** - API key-based admin access
- **Experience Management** - Add, edit, delete work experience with technologies
- **Project Management** - Manage portfolio projects
- **Nested Data Support** - Multiple positions per company with job descriptions
- **Modular Components** - Well-organized, maintainable code structure

### 🎯 Key Sections
1. **About Me** - Personal introduction and technical skills
2. **Experience** - Professional work history with technology stacks
3. **Projects** - Showcase of technical projects (Coming Soon)

## 🚀 Getting Started

## 📁 Project Structure

```
portfolio/
├── client/                          # React frontend application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── AboutSection.jsx     # About section component
│   │   │   ├── ExperienceSection.jsx # Experience section component
│   │   │   ├── ProjectsSection.jsx  # Projects section component
│   │   │   ├── Sidebar.jsx          # Navigation sidebar with theme toggle
│   │   │   └── admin/               # Admin panel components
│   │   │       ├── AuthForm.jsx     # Admin authentication form
│   │   │       ├── AdminTabs.jsx    # Admin tab navigation
│   │   │       ├── ExperienceForm.jsx # Experience management form
│   │   │       ├── ExperienceList.jsx # Experience list display
│   │   │       ├── ProjectForm.jsx  # Project management form
│   │   │       └── ProjectList.jsx  # Project list display
│   │   ├── pages/                   # Main page components
│   │   │   ├── Home.jsx             # Main portfolio page (modularized)
│   │   │   └── Admin.jsx            # Admin panel (modularized)
│   │   ├── assets/                  # Static assets (images, icons)
│   │   ├── App.jsx                  # Main app component with routing
│   │   ├── main.jsx                 # React app entry point
│   │   └── index.css                # Global styles and Tailwind imports
│   ├── public/                      # Public static files
│   ├── package.json                 # Frontend dependencies and scripts
│   ├── vite.config.js               # Vite configuration with API proxy
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── postcss.config.js            # PostCSS configuration
├── server/                          # Node.js backend API
│   ├── config/
│   │   └── database.js              # MySQL connection pool configuration
│   ├── routes/                      # API route handlers
│   │   ├── experience.js            # Experience CRUD operations
│   │   └── projects.js              # Projects CRUD operations
│   ├── middleware/
│   │   └── auth.js                  # Authentication middleware
│   ├── database/
│   │   └── schema.sql               # Database schema and sample data
│   ├── .env                         # Environment variables
│   ├── index.js                     # Express server entry point
│   └── package.json                 # Backend dependencies and scripts
├── package.json                     # Root package.json with concurrent scripts
└── README.md                        # Project documentation
```

### Frontend Structure Details

#### Components (`client/src/components/`)
- **AboutSection.jsx**: About section with personal info and skills
- **ExperienceSection.jsx**: Experience display with technology tags
- **ProjectsSection.jsx**: Projects showcase (Coming Soon)
- **Sidebar.jsx**: Main navigation component with:
  - Manual section navigation
  - Dark/light mode toggle
  - Admin panel access
  - Responsive design

#### Admin Components (`client/src/components/admin/`)
- **AuthForm.jsx**: Admin authentication interface
- **AdminTabs.jsx**: Tab navigation for admin sections
- **ExperienceForm.jsx**: Experience management with nested forms
- **ExperienceList.jsx**: Experience data display and management
- **ProjectForm.jsx**: Project creation and editing
- **ProjectList.jsx**: Project data display and management

#### Pages (`client/src/pages/`)
- **Home.jsx**: Modularized main portfolio page
- **Admin.jsx**: Modularized content management interface

#### Styling (`client/src/index.css`)
- Global CSS variables for theming
- Custom animations (fade-in, slide-up, scale-in)
- Responsive design utilities

### Backend Structure Details

#### Configuration (`server/config/`)
- **database.js**: MySQL connection pool setup with:
  - Environment-based configuration
  - Connection testing
  - Error handling

#### Routes (`server/routes/`)
- **experience.js**: Experience management API endpoints:
  - `GET /api/experience` - Fetch all experience data with technologies
  - `POST /api/experience` - Add new experience (admin only)
  - `PUT /api/experience/:id` - Update experience (admin only)
  - `DELETE /api/experience/:id` - Delete experience (admin only)
- **projects.js**: Project management API endpoints:
  - `GET /api/projects` - Fetch all projects
  - `POST /api/projects` - Add new project (admin only)
  - `PUT /api/projects/:id` - Update project (admin only)
  - `DELETE /api/projects/:id` - Delete project (admin only)

#### Middleware (`server/middleware/`)
- **auth.js**: Authentication middleware:
  - API key validation for admin routes

#### Database (`server/database/`)
- **schema.sql**: Complete database schema:
  - `experience` table: Company information
  - `experience_positions` table: Job positions with technologies
  - `experience_bullets` table: Job descriptions for each position
  - `projects` table: Project information
  - Foreign key relationships and sample data

### Key Features by File

#### Frontend Features
- **Modular Architecture**: Well-organized component structure
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Theme Switching**: Dark/light mode with CSS variables
- **Smooth Animations**: CSS transitions and custom animations
- **Dynamic Content**: Real-time data fetching from API
- **Admin Interface**: Secure content management system
- **Technology Tags**: Brittany Chiang style technology display

#### Backend Features
- **RESTful API**: Clean, consistent API design
- **Database Integration**: MySQL with connection pooling
- **Security**: API key authentication for admin routes
- **Error Handling**: Comprehensive error responses
- **Data Validation**: Input validation and sanitization
- **Technologies Support**: Enhanced experience data with technology stacks

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built by Seungjin Kim**
