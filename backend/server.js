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
    id: Number,
    title: String,
    category: String,
    subCategory: String,
    subcategory: String,
    subType: String,
    images: [String],
    location: String,
    imageUrl: String,
    description: String,
    customizationNote: String,
    materials: [String],
    portfolio: [String],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectSchema);

// Routes

// Get all projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    const normalized = projects.map((project) => ({
      ...project.toObject(),
      subCategory: project.subCategory || project.subcategory || '',
      subcategory: project.subCategory || project.subcategory || '',
      subType: project.subType || '',
      images: project.images || [],
      imageUrl: project.imageUrl || project.images?.[0] || '',
      materials: project.materials || [],
      portfolio: project.portfolio || project.images || [],
      customizationNote: project.customizationNote || '',
    }));
    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create project
app.post("/api/admin/projects", async (req, res) => {
  try {
    const payload = {
      ...req.body,
      id: req.body.id ?? Date.now(),
      subCategory: req.body.subCategory || req.body.subcategory || '',
      subcategory: req.body.subCategory || req.body.subcategory || '',
      subType: req.body.subType || '',
      images: Array.isArray(req.body.images) ? req.body.images : [],
      imageUrl: req.body.imageUrl || req.body.images?.[0] || '',
      materials: Array.isArray(req.body.materials) ? req.body.materials : (req.body.customizationNote ? ['Custom Design'] : []),
      portfolio: Array.isArray(req.body.portfolio) ? req.body.portfolio : (Array.isArray(req.body.images) ? req.body.images : []),
      customizationNote: req.body.customizationNote || '',
    };

    const project = new Project(payload);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update project
app.put("/api/admin/projects/:id", async (req, res) => {
  try {
    const payload = {
      ...req.body,
      subCategory: req.body.subCategory || req.body.subcategory || '',
      subcategory: req.body.subCategory || req.body.subcategory || '',
      subType: req.body.subType || '',
      images: Array.isArray(req.body.images) ? req.body.images : [],
      imageUrl: req.body.imageUrl || req.body.images?.[0] || '',
      materials: Array.isArray(req.body.materials) ? req.body.materials : (req.body.customizationNote ? ['Custom Design'] : []),
      portfolio: Array.isArray(req.body.portfolio) ? req.body.portfolio : (Array.isArray(req.body.images) ? req.body.images : []),
      customizationNote: req.body.customizationNote || '',
    };

    const project = await Project.findOneAndUpdate(
      { id: req.params.id },
      payload,
      { new: true }
    );

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete project
app.delete("/api/admin/projects/:id", async (req, res) => {
  try {
    await Project.findOneAndDelete({ id: req.params.id });

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