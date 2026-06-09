import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit2, Save, X } from 'lucide-react';
import { PROJECTS } from '../constants';
import { fetchProjects } from '../lib/projectApi';
import { createProject, updateProjectData, deleteProjectData } from '../lib/adminApi';
import type { Project, Category } from '../types';

const categories: Category[] = ['Living Room', 'Bedroom', 'Office', 'Dining'];

const AdminPanel: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    id: 0,
    title: '',
    category: 'Living Room',
    location: '',
    materials: [],
    description: '',
    imageUrl: '',
    portfolio: [],
  });

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjects(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddClick = () => {
    const nextId = Math.max(...projects.map((p) => p.id), 0) + 1;
    setFormData({
      id: nextId,
      title: '',
      category: 'Living Room',
      location: '',
      materials: [],
      description: '',
      imageUrl: '',
      portfolio: [],
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      if (!formData.title || !formData.category || !formData.location) {
        setError('Please fill in all required fields');
        return;
      }

      if (editingId) {
        const updated = await updateProjectData(editingId, formData);
        setProjects((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
      } else {
        const created = await createProject(formData as Project);
        setProjects((prev) => [...prev, created]);
      }

      setShowForm(false);
      setFormData({});
    } catch (err: any) {
      setError(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;

    try {
      setSaving(true);
      setError(null);
      await deleteProjectData(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete project');
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (field: keyof Project, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <section className="py-24 px-6 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif mb-4">Admin Panel</h1>
          <p className="text-[#2C2C2C]/70">Loading projects…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-serif mb-2">Admin Panel</h1>
          <div className="w-24 h-1 bg-[#BFA57A] mb-8"></div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 p-8 bg-[#F5F1EA] rounded-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif">
                  {editingId ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-white rounded"
                  disabled={saving}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* ID (read-only if editing) */}
                <div>
                  <label className="block text-sm font-semibold mb-2">ID</label>
                  <input
                    type="number"
                    value={formData.id || ''}
                    onChange={(e) => handleFieldChange('id', parseInt(e.target.value))}
                    disabled={!!editingId}
                    className="w-full px-3 py-2 border border-[#BFA57A]/30 rounded bg-white disabled:bg-gray-100"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-[#BFA57A]/30 rounded"
                    placeholder="Project title"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category || 'Living Room'}
                    onChange={(e) => handleFieldChange('category', e.target.value as Category)}
                    className="w-full px-3 py-2 border border-[#BFA57A]/30 rounded"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => handleFieldChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-[#BFA57A]/30 rounded"
                    placeholder="e.g., Colombo 7, Sri Lanka"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl || ''}
                    onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-[#BFA57A]/30 rounded"
                    placeholder="https://..."
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-[#BFA57A]/30 rounded"
                    placeholder="Project description"
                    rows={3}
                  />
                </div>

                {/* Materials */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">
                    Materials (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={(formData.materials || []).join(', ')}
                    onChange={(e) =>
                      handleFieldChange('materials', e.target.value.split(',').map((m) => m.trim()))
                    }
                    className="w-full px-3 py-2 border border-[#BFA57A]/30 rounded"
                    placeholder="Teak, Italian Velvet, Brass Details"
                  />
                </div>

                {/* Portfolio URLs */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">
                    Portfolio Images (one URL per line)
                  </label>
                  <textarea
                    value={(formData.portfolio || []).join('\n')}
                    onChange={(e) =>
                      handleFieldChange('portfolio', e.target.value.split('\n').filter((u) => u.trim()))
                    }
                    className="w-full px-3 py-2 border border-[#BFA57A]/30 rounded font-mono text-xs"
                    placeholder="https://image1.jpg&#10;https://image2.jpg"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-[#BFA57A] text-white rounded hover:bg-[#A98960] disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? 'Saving…' : editingId ? 'Update' : 'Create'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  disabled={saving}
                  className="px-6 py-2 border border-[#BFA57A]/30 rounded hover:bg-[#F5F1EA]"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {!showForm && (
            <button
              onClick={handleAddClick}
              className="mb-8 px-6 py-2 bg-[#BFA57A] text-white rounded hover:bg-[#A98960]"
            >
              + Add New Project
            </button>
          )}

          {/* Projects List */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#BFA57A]/20">
                  <th className="text-left p-3 font-semibold">ID</th>
                  <th className="text-left p-3 font-semibold">Title</th>
                  <th className="text-left p-3 font-semibold">Category</th>
                  <th className="text-left p-3 font-semibold">Location</th>
                  <th className="text-center p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-[#BFA57A]/10 hover:bg-[#F5F1EA] transition-colors"
                  >
                    <td className="p-3">{project.id}</td>
                    <td className="p-3">{project.title}</td>
                    <td className="p-3">{project.category}</td>
                    <td className="p-3 text-sm text-[#2C2C2C]/70">{project.location}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleEditClick(project)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 mr-2 disabled:opacity-50"
                        disabled={saving}
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
                        disabled={saving}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#2C2C2C]/70 mb-4">No projects yet</p>
              <button
                onClick={handleAddClick}
                className="px-6 py-2 bg-[#BFA57A] text-white rounded hover:bg-[#A98960]"
              >
                + Add Your First Project
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AdminPanel;
