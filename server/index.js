import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// health
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "portfolio-api", timestamp: Date.now() });
});

// hello
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Node/Express backend 👋" });
});

// projects
app.get("/api/projects", (req, res) => {
  const projects = [
    { id: 1, title: "A/B Testing Dashboard", stack: ["React", "Node"], url: "#" },
    { id: 2, title: "CI/CD Tooling Suite", stack: ["Vue", "PHP"], url: "#" },
    { id: 3, title: "Map SDK Playground", stack: ["TypeScript", "ArcGIS JS"], url: "#" }
  ];
  res.json(projects);
});

// contact (demo)
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  console.log("CONTACT_FORM_SUBMISSION:", { name, email, message, at: new Date().toISOString() });
  // In real app: validate + send email or persist to DB
  res.status(200).json({ ok: true, received: { name, email } });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
