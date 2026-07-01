require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const ProjectSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  subcategory: String,
  location: String,
  imageUrl: String,
  description: String,
  materials: [String],
  portfolio: [String],
});

const Project = mongoose.model("Project", ProjectSchema);

// GET all projects
app.get("/api/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// CREATE project
app.post("/api/admin/projects", async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

// UPDATE
app.put("/api/admin/projects/:id", async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );
  res.json(project);
});

// DELETE
app.delete("/api/admin/projects/:id", async (req, res) => {
  await Project.findOneAndDelete({ id: req.params.id });
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});