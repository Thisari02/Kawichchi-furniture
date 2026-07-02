import { useEffect, useState } from 'react';
import { categories } from '../data/categories';

type ProjectForm = {
  id?: number;
  title: string;
  category: string;
  subCategory: string;
  subType: string;
  images: string[];
  description: string;
  customizationNote: string;
};

type ProjectRecord = ProjectForm & {
  _id?: string;
};

const initialForm: ProjectForm = {
  title: '',
  category: '',
  subCategory: '',
  subType: '',
  images: [],
  description: '',
  customizationNote: '',
};

const API_BASE = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000' : 'https://kawichchi-furniture.onrender.com')).replace(/\/$/, '');

export default function AdminPanel() {
  const [form, setForm] = useState<ProjectForm>(initialForm);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const subCategories = categories.find((c) => c.name === form.category)?.subCategories || [];
  const subTypes = subCategories.find((s) => s.name === form.subCategory)?.subTypes || [];

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/admin/projects`);
      if (!res.ok) throw new Error('Unable to load projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const promises = files.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
          reader.readAsDataURL(file);
        })
    );

    const uploadedImages = await Promise.all(promises);
    setForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedImages.filter(Boolean)] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const payload = {
      ...form,
      images: form.images.filter(Boolean),
    };

    try {
      const url = form.id ? `${API_BASE}/api/admin/projects/${form.id}` : `${API_BASE}/api/admin/projects`;
      const method = form.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Unable to save project');
      }

      await loadProjects();
      setForm(initialForm);
      setMessage(form.id ? 'Project updated successfully.' : 'Project created successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: ProjectRecord) => {
    setForm({
      id: project.id,
      title: project.title || '',
      category: project.category || '',
      subCategory: project.subCategory || '',
      subType: project.subType || '',
      images: Array.isArray(project.images) ? project.images : [],
      description: project.description || '',
      customizationNote: project.customizationNote || '',
    });
    setMessage('Editing project.');
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm('Delete this project?')) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/admin/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Unable to delete project');
      await loadProjects();
      if (form.id === id) setForm(initialForm);
      setMessage('Project deleted successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to delete project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h2 className="mb-4 text-xl font-bold">Admin Panel - Manage Projects</h2>

      {message ? <p className="mb-3 rounded border border-gray-300 bg-gray-50 p-2 text-sm">{message}</p> : null}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSubmit} className="rounded border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">{form.id ? 'Edit Project' : 'Create Project'}</h3>

          <input
            name="title"
            value={form.title}
            placeholder="Project Title"
            onChange={handleChange}
            className="mb-2 w-full border p-2"
            required
          />

          <select name="category" value={form.category} onChange={handleChange} className="mb-2 w-full border p-2" required>
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select name="subCategory" value={form.subCategory} onChange={handleChange} className="mb-2 w-full border p-2" required>
            <option value="">Select SubCategory</option>
            {subCategories.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <select name="subType" value={form.subType} onChange={handleChange} className="mb-2 w-full border p-2" required>
            <option value="">Select SubType</option>
            {subTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <label className="mb-2 block text-sm text-gray-600">Upload images directly</label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="mb-2 w-full border p-2" />

          <input
            name="images"
            value={form.images.join(', ')}
            placeholder="Image URLs (comma separated)"
            onChange={(e) => setForm({ ...form, images: e.target.value.split(',').map((img) => img.trim()).filter(Boolean) })}
            className="mb-2 w-full border p-2"
          />

          <textarea
            name="description"
            value={form.description}
            placeholder="Description"
            onChange={handleChange}
            className="mb-2 w-full border p-2"
          />

          <input
            name="customizationNote"
            value={form.customizationNote}
            placeholder="Customization Note"
            onChange={handleChange}
            className="mb-2 w-full border p-2"
          />

          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-black px-4 py-2 text-white" disabled={loading}>
              {form.id ? 'Update Project' : 'Create Project'}
            </button>
            {form.id ? (
              <button type="button" onClick={() => setForm(initialForm)} className="border px-4 py-2">
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">Existing Projects</h3>
          {loading && !projects.length ? <p>Loading projects…</p> : null}
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id || project._id} className="rounded border p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{project.title}</p>
                    <p className="text-sm text-gray-600">{project.category} / {project.subCategory} / {project.subType}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEdit(project)} className="rounded bg-gray-800 px-2 py-1 text-sm text-white">
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(project.id)} className="rounded bg-red-600 px-2 py-1 text-sm text-white">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
