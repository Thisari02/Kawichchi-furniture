require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

// Schema
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    subType: { type: String, required: true },
    images: { type: [String], default: [] },
    description: { type: String, default: "" },
    materials: { type: [String], default: [] },
    customizationNote: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectSchema);

// Routes
app.get("/api/admin/reset-db", async (req, res) => {
  try {
    await Project.deleteMany({});
    res.json({ message: "All project data deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find({}).lean();
    const normalized = projects.map((project) => ({
      _id: project._id,
      title: project.title,
      category: project.category,
      subCategory: project.subCategory,
      subType: project.subType,
      images: project.images || [],
      description: project.description || "",
      materials: project.materials || [],
      customizationNote: project.customizationNote || "",
      createdAt: project.createdAt,
    }));
    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/admin/projects", async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      category: req.body.category,
      subCategory: req.body.subCategory,
      subType: req.body.subType,
      images: Array.isArray(req.body.images) ? req.body.images : [],
      description: req.body.description || "",
      materials: Array.isArray(req.body.materials) ? req.body.materials : [],
      customizationNote: req.body.customizationNote || "",
    };

    const project = new Project(payload);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/admin/projects/:id", async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      category: req.body.category,
      subCategory: req.body.subCategory,
      subType: req.body.subType,
      images: Array.isArray(req.body.images) ? req.body.images : [],
      description: req.body.description || "",
      materials: Array.isArray(req.body.materials) ? req.body.materials : [],
      customizationNote: req.body.customizationNote || "",
    };

    const project = await Project.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/admin/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({
      success: true,
      message: "Project deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});