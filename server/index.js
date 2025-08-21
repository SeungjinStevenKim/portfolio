import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";
import experienceRoutes from "./routes/experience.js";
import projectRoutes from "./routes/projects.js";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  console.error('Please check your .env file or deployment configuration');
}

// Debug: Log all database-related environment variables
console.log('🔍 Database Environment Variables:');
console.log('   MYSQL_URL:', process.env.MYSQL_URL ? 'Set' : 'Not set');
console.log('   DB_HOST:', process.env.DB_HOST || 'Not set');
console.log('   DB_USER:', process.env.DB_USER || 'Not set');
console.log('   DB_NAME:', process.env.DB_NAME || 'Not set');
console.log('   DB_PORT:', process.env.DB_PORT || 'Not set');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('   PORT:', process.env.PORT || '5000');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
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

// Database test endpoint
app.get("/api/test-db", async (req, res) => {
  try {
    const { pool } = await import('./config/database.js');
    const connection = await pool.getConnection();
    const [tables] = await connection.query('SHOW TABLES');
    connection.release();
    
    res.json({
      status: "success",
      message: "Database connection successful",
      tables: tables.map(row => Object.values(row)[0]),
      env: {
        dbHost: process.env.DB_HOST,
        dbName: process.env.DB_NAME,
        dbUser: process.env.DB_USER,
        dbPort: process.env.DB_PORT,
        mysqlUrl: process.env.MYSQL_URL ? 'Set' : 'Not set'
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
      env: {
        dbHost: process.env.DB_HOST,
        dbName: process.env.DB_NAME,
        dbUser: process.env.DB_USER,
        dbPort: process.env.DB_PORT,
        mysqlUrl: process.env.MYSQL_URL ? 'Set' : 'Not set'
      }
    });
  }
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
