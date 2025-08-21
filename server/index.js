import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";
import experienceRoutes from "./routes/experience.js";
import projectRoutes from "./routes/projects.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Test database connection on startup
testConnection();

// API Routes
app.use("/api/experience", experienceRoutes);
app.use("/api/projects", projectRoutes);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
