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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [useFileUpload, setUseFileUpload] = useState(false);
  const [portfolioPreviews, setPortfolioPreviews] = useState<string[]>([]);
  const [usePortfolioFileUpload, setUsePortfolioFileUpload] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    _id: '',
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
        console.log('Fetched projects:', data);
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
    setImagePreview(null);
    setUseFileUpload(false);
    setPortfolioPreviews([]);
    setUsePortfolioFileUpload(false);
    setShowForm(true);
  };

  const handleEditClick = (project: Project) => {
    console.log("Editing project:", project);
    setFormData(project);
    setEditingId(project.id.toString());
    console.log("Editing ID set to:", project.id.toString());
    setImagePreview(project.imageUrl || null);
    setUseFileUpload(false);
    setPortfolioPreviews(project.portfolio || []);
    setUsePortfolioFileUpload(false);
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
        console.log("editingId", editingId);
      if (editingId) {
        const updated = await updateProjectData(editingId, formData);
        setProjects((prev) => prev.map((p) => (p.id.toString() === editingId ? updated : p)));
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      setSaving(true);
      setError(null);
      await deleteProjectData(id);
      setProjects((prev) => prev.filter((p) => p.id.toString() !== id));
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

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError(`Image file is too large. Maximum size is 5MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setImagePreview(base64String);
        handleFieldChange('imageUrl', base64String);
        setError(null); // Clear any previous errors
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImageUpload = () => {
    setImagePreview(null);
    handleFieldChange('imageUrl', '');
    setUseFileUpload(false);
  };

  const handlePortfolioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate total file size (max 50MB total for all portfolio images)
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const maxTotalSize = 50 * 1024 * 1024; // 50MB
    if (totalSize > maxTotalSize) {
      setError(`Portfolio images are too large. Maximum total size is 50MB. Your files are ${(totalSize / (1024 * 1024)).toFixed(2)}MB`);
      return;
    }

    // Process each file
    let processedCount = 0;
    const newPreviews: string[] = [...portfolioPreviews];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        newPreviews.push(base64String);
        processedCount++;

        if (processedCount === files.length) {
          setPortfolioPreviews(newPreviews);
          handleFieldChange('portfolio', newPreviews);
          setError(null); // Clear any previous errors
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePortfolioImage = (index: number) => {
    const updated = portfolioPreviews.filter((_, i) => i !== index);
    setPortfolioPreviews(updated);
    handleFieldChange('portfolio', updated);
  };

  const clearPortfolioUpload = () => {
    setPortfolioPreviews([]);
    handleFieldChange('portfolio', []);
    setUsePortfolioFileUpload(false);
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
          <div className="w-24 h-1 bg-[#D4AF37] mb-8"></div>

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
                    className="w-full px-3 py-2 border border-[#D4AF37]/30 rounded bg-white disabled:bg-gray-100"
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
                    className="w-full px-3 py-2 border border-[#D4AF37]/30 rounded"
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
                    className="w-full px-3 py-2 border border-[#D4AF37]/30 rounded"
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
                    className="w-full px-3 py-2 border border-[#D4AF37]/30 rounded"
                    placeholder="e.g., Colombo 7, Sri Lanka"
                  />
                </div>

                {/* Image */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Image</label>
                  <div className="flex gap-4 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={!useFileUpload}
                        onChange={() => setUseFileUpload(false)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">URL</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={useFileUpload}
                        onChange={() => setUseFileUpload(true)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Upload Image</span>
                    </label>
                  </div>

                  {!useFileUpload ? (
                    <input
                      type="url"
                      value={formData.imageUrl || ''}
                      onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-[#D4AF37]/30 rounded"
                      placeholder="https://..."
                    />
                  ) : (
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="w-full px-3 py-2 border border-[#D4AF37]/30 rounded cursor-pointer file:bg-[#D4AF37] file:text-white file:border-0 file:rounded file:px-4 file:py-2 file:cursor-pointer file:hover:bg-[#F5D547]"
                      />
                      {imagePreview && (
                        <div className="relative inline-block">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-w-xs h-40 object-cover rounded border border-[#D4AF37]/30"
                          />
                          <button
                            type="button"
                            onClick={clearImageUpload}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {imagePreview && (
                    <p className="text-xs text-green-600 mt-2">✓ Image selected</p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-[#D4AF37]/30 rounded"
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
                    className="w-full px-3 py-2 border border-[#D4AF37]/30 rounded"
                    placeholder="Teak, Italian Velvet, Brass Details"
                  />
                </div>

                {/* Portfolio Images */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Portfolio Images</label>
                  <div className="flex gap-4 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={!usePortfolioFileUpload}
                        onChange={() => setUsePortfolioFileUpload(false)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">URLs (one per line)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={usePortfolioFileUpload}
                        onChange={() => setUsePortfolioFileUpload(true)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Upload Images</span>
                    </label>
                  </div>

                  {!usePortfolioFileUpload ? (
                    <textarea
                      value={(formData.portfolio || []).join('\n')}
                      onChange={(e) =>
                        handleFieldChange('portfolio', e.target.value.split('\n').filter((u) => u.trim()))
                      }
                      className="w-full px-3 py-2 border border-[#D4AF37]/30 rounded font-mono text-xs"
                      placeholder="https://image1.jpg&#10;https://image2.jpg"
                      rows={3}
                    />
                  ) : (
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePortfolioFileChange}
                        className="w-full px-3 py-2 border border-[#D4AF37]/30 rounded cursor-pointer file:bg-[#D4AF37] file:text-white file:border-0 file:rounded file:px-4 file:py-2 file:cursor-pointer file:hover:bg-[#F5D547]"
                      />
                      {portfolioPreviews.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-green-600">✓ {portfolioPreviews.length} image(s) selected</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {portfolioPreviews.map((preview, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={preview}
                                  alt={`Portfolio ${index + 1}`}
                                  className="w-full h-20 object-cover rounded border border-[#D4AF37]/30"
                                />
                                <button
                                  type="button"
                                  onClick={() => removePortfolioImage(index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={clearPortfolioUpload}
                            className="text-xs text-red-600 hover:text-red-700 mt-2"
                          >
                            Clear all
                          </button>
                        </div>
                      )}
                    </div>
                  )}
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
                  className="px-6 py-2 border border-[#D4AF37]/30 rounded hover:bg-[#F5F1EA]"
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
                        onClick={() => handleDelete(project.id.toString())}
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
