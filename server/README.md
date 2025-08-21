# Portfolio API Server

A portfolio API server using MySQL database.

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file with the following content:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h

# Admin API Key (for admin functionality)
ADMIN_API_KEY=your_admin_secret_key_here

# Server Configuration
PORT=5001
NODE_ENV=development
```

### 3. MySQL Database Setup
- MySQL must be installed
- Initialize database:
```bash
npm run init-db
```

### 4. Start Server
```bash
npm run dev
```

## 📊 Database Structure

### Experience Tables
- `experience`: Company information
- `experience_positions`: Job position information
- `experience_bullets`: Job descriptions

### Projects Table
- `projects`: Project information

## 🔌 API Endpoints

### Experience API

#### GET /api/experience
Get all experience data
```bash
curl http://localhost:5001/api/experience
```

#### POST /api/experience (Admin only)
Add new experience
```bash
curl -X POST http://localhost:5001/api/experience \
  -H "Content-Type: application/json" \
  -H "x-admin-key: your_admin_secret_key_here" \
  -d '{
    "company": "New Company",
    "location": "Seoul, Korea",
    "positions": [
      {
        "title": "Software Engineer",
        "period": "2023 - Present",
        "bullets": [
          "Developed web applications using React",
          "Implemented CI/CD pipelines"
        ]
      }
    ]
  }'
```

#### PUT /api/experience/:id (Admin only)
Update experience
```bash
curl -X PUT http://localhost:5001/api/experience/1 \
  -H "Content-Type: application/json" \
  -H "x-admin-key: your_admin_secret_key_here" \
  -d '{
    "company": "Updated Company",
    "location": "Updated Location",
    "positions": [...]
  }'
```

#### DELETE /api/experience/:id (Admin only)
Delete experience
```bash
curl -X DELETE http://localhost:5001/api/experience/1 \
  -H "x-admin-key: your_admin_secret_key_here"
```

### Projects API

#### GET /api/projects
Get all projects
```bash
curl http://localhost:5001/api/projects
```

#### POST /api/projects (Admin only)
Add new project
```bash
curl -X POST http://localhost:5001/api/projects \
  -H "Content-Type: application/json" \
  -H "x-admin-key: your_admin_secret_key_here" \
  -d '{
    "title": "New Project",
    "description": "Project description",
    "technologies": "React, Node.js",
    "github_url": "https://github.com/user/project",
    "live_url": "https://project.com",
    "featured": true,
    "order_index": 1
  }'
```

#### PUT /api/projects/:id (Admin only)
Update project
```bash
curl -X PUT http://localhost:5001/api/projects/1 \
  -H "Content-Type: application/json" \
  -H "x-admin-key: your_admin_secret_key_here" \
  -d '{
    "title": "Updated Project",
    "description": "Updated description",
    ...
  }'
```

#### DELETE /api/projects/:id (Admin only)
Delete project
```bash
curl -X DELETE http://localhost:5001/api/projects/1 \
  -H "x-admin-key: your_admin_secret_key_here"
```

## 🔐 Admin Authentication

To use admin functionality, authenticate using one of these methods:

### 1. Header Method
```bash
curl -H "x-admin-key: your_admin_secret_key_here" ...
```

### 2. Query Parameter Method
```bash
curl "http://localhost:5001/api/experience?admin_key=your_admin_secret_key_here"
```

## 📝 Frontend Integration

To fetch data from frontend:

```javascript
// Get Experience data
const response = await fetch('http://localhost:5001/api/experience');
const experience = await response.json();

// Get Projects data
const response = await fetch('http://localhost:5001/api/projects');
const projects = await response.json();
```

## 🛠️ Development Tools

### Database Initialization
```bash
npm run init-db
```

### Server Restart
```bash
npm run dev
```


