import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";
import experienceRoutes from "./routes/experience.js";
import projectRoutes from "./routes/projects.js";

// Load environment variables
dotenv.config();

// Check for database connection
if (!process.env.MYSQL_URL && !process.env.DB_HOST) {
  console.warn('⚠️  Database connection variables not found');
}

// Log environment info
console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🚀 Starting server on port: ${process.env.PORT || '5000'}`);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', // Local development
    'https://portfolio-zeta-smoky-u4kest6im2.vercel.app', // Production frontend
    /^https:\/\/.*\.vercel\.app$/ // Any Vercel preview deployments
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Test database connection on startup
let dbConnected = false;
testConnection().then(connected => {
  dbConnected = connected;
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Portfolio API is running",
    database: dbConnected ? "connected" : "disconnected"
  });
});

// Admin authentication endpoint
app.post("/api/admin/auth", (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  
  if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ 
      error: 'Invalid admin key' 
    });
  }
  
  res.json({ 
    status: "success", 
    message: "Admin authentication successful" 
  });
});



// API Routes
app.use("/api/experience", experienceRoutes);
app.use("/api/projects", projectRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 API listening on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
