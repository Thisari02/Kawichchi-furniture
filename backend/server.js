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
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ========================
// PROJECT SCHEMA (FIXED)
// ========================
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    subType: { type: String, required: true },

    location: { type: String, default: "" }, // ✅ FIX ADDED

    images: { type: [String], default: [] },

    description: { type: String, default: "" },
    materials: { type: [String], default: [] },

    customizationNote: { type: String, default: "" },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

// ========================
// RESET DB
// ========================
app.get("/api/admin/reset-db", async (req, res) => {
  try {
    await Project.deleteMany({});
    res.json({ message: "All project data deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================
// GET ALL PROJECTS
// ========================
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find({}).lean();

    const normalized = projects.map((p) => ({
      _id: p._id,
      title: p.title,

      category: p.category,
      subCategory: p.subCategory,
      subType: p.subType,

      location: p.location || "", // ✅ FIX

      images: p.images || [],

      description: p.description || "",
      materials: p.materials || [],

      customizationNote: p.customizationNote || "",

      createdAt: p.createdAt,
    }));

    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================
// CREATE PROJECT
// ========================
app.post("/api/admin/projects", async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,

      category: req.body.category,
      subCategory: req.body.subCategory,
      subType: req.body.subType,

      location: req.body.location || "", // ✅ FIX

      images: Array.isArray(req.body.images) ? req.body.images : [],

      description: req.body.description || "",
      materials: Array.isArray(req.body.materials)
        ? req.body.materials
        : [],

      customizationNote: req.body.customizationNote || "",
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================
// UPDATE PROJECT
// ========================
app.put("/api/admin/projects/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: req.body.category,
        subCategory: req.body.subCategory,
        subType: req.body.subType,

        location: req.body.location || "", // ✅ FIX

        images: Array.isArray(req.body.images) ? req.body.images : [],

        description: req.body.description || "",
        materials: Array.isArray(req.body.materials)
          ? req.body.materials
          : [],

        customizationNote: req.body.customizationNote || "",
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================
// DELETE PROJECT
// ========================
app.delete("/api/admin/projects/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================
// START SERVER
// ========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});