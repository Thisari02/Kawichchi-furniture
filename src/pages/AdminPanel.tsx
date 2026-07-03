import { useEffect, useState } from 'react';
import { categories } from '../data/categories';
import type { Project } from '../types/project';

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:4000'
    : 'https://kawichchi-furniture.onrender.com');

const initialForm: Project = {
  id: undefined,
  title: '',
  category: '',
  subCategory: '',
  subType: '',
  images: [],
  description: '',
  customizationNote: '',
};

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to decode image.'));
      img.src = String(reader.result || '');
    };
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}

async function compressImageToDataUrl(file: File): Promise<string> {
  const image = await loadImage(file);
  const maxDimension = 1600;
  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas is not available in this browser.');
  }

  ctx.drawImage(image, 0, 0, width, height);

  // Use JPEG compression for more reliable upload sizes in serverless/live environments.
  return canvas.toDataURL('image/jpeg', 0.82);
}

export default function AdminPanel() {
  const [form, setForm] = useState<Project>(initialForm);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const subCategories =
    categories.find((c) => c.name === form.category)?.subCategories || [];

  const subTypes =
    subCategories.find((s) => s.name === form.subCategory)?.subTypes || [];

  // Load projects
  useEffect(() => {
    fetch(`${API_BASE}/api/admin/projects`)
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) {
      return;
    }

    const uploadedImages = await Promise.all(files.map((file) => compressImageToDataUrl(file)));

    setForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...uploadedImages.filter(Boolean)],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);

    const url = editingId
      ? `${API_BASE}/api/admin/projects/${editingId}`
      : `${API_BASE}/api/admin/projects`;

    const method = editingId ? 'PUT' : 'POST';

    const saveResponse = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!saveResponse.ok) {
      const message = await saveResponse.text();
      window.alert(message || 'Failed to save project.');
      setLoading(false);
      return;
    }

    const res = await fetch(`${API_BASE}/api/admin/projects`);
    const data = await res.json();

    setProjects(data);
    setForm(initialForm);
    setEditingId(null);
    setLoading(false);
  };

  const handleEdit = (p: any) => {
    setForm(p);
    setEditingId(String(p._id ?? p.id ?? ''));
  };

  const handleDelete = async (id: string | number) => {
    await fetch(`${API_BASE}/api/admin/projects/${id}`, {
      method: 'DELETE',
    });

    setProjects(projects.filter((p: any) => String(p._id ?? p.id) !== String(id)));
  };

  const moveProject = (from: number, to: number) => {
    if (from === to || to < 0 || to >= projects.length) {
      return;
    }
    const reordered = [...projects];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setProjects(reordered);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid gap-3 max-w-xl">

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2"
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
              subCategory: '',
              subType: '',
            })
          }
          className="border p-2"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* SUBCATEGORY */}
        <select
          name="subCategory"
          value={form.subCategory}
          onChange={(e) =>
            setForm({ ...form, subCategory: e.target.value, subType: '' })
          }
          className="border p-2"
        >
          <option value="">Select SubCategory</option>
          {subCategories.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        {/* SUBTYPE */}
        <select
          name="subType"
          value={form.subType}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">Select SubType</option>
          {subTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2"
        />

        <label className="text-sm text-gray-600">Upload images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="border p-2"
        />

        <input
          name="images"
          value={(form.images || []).join(', ')}
          onChange={(e) =>
            setForm({
              ...form,
              images: e.target.value
                .split(',')
                .map((img) => img.trim())
                .filter(Boolean),
            })
          }
          placeholder="Image URLs / base64 (comma separated)"
          className="border p-2"
        />

        <input
          name="customizationNote"
          value={form.customizationNote}
          onChange={handleChange}
          placeholder="Customization Note"
          className="border p-2"
        />

        <button className="bg-black text-white p-2 disabled:opacity-60" disabled={loading}>
          {editingId ? 'Update' : 'Create'}
        </button>
      </form>

      {/* LIST */}
      <div className="mt-8 space-y-2">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#8A6D2F]">
          Drag cards to reorder gallery preview
        </p>
        {projects.map((p: any, index: number) => {
          const projectKey = p._id ?? p.id ?? `${p.title}-${index}`;
          const projectId = p._id ?? p.id;

          return (
          <div
            key={projectKey}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex !== null) {
                moveProject(dragIndex, index);
              }
              setDragIndex(null);
            }}
            onDragEnd={() => setDragIndex(null)}
            className="flex justify-between items-center p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition border border-[#D4AF37]/15"
          >
            <div>
              <p className="mb-1 text-xs text-[#8A6D2F]">#{index + 1}</p>
              <b>{p.title}</b>
              <p className="text-sm">
                {p.category} → {p.subCategory} → {p.subType}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="px-3 py-1 rounded-full text-sm bg-[#D4AF37]/20 text-[#7A5D1E] hover:scale-105 transition"
                onClick={() => moveProject(index, index - 1)}
              >
                ↑
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded-full text-sm bg-[#D4AF37]/20 text-[#7A5D1E] hover:scale-105 transition"
                onClick={() => moveProject(index, index + 1)}
              >
                ↓
              </button>
              <button className="px-3 py-1 rounded-full text-sm bg-black text-white hover:scale-105 transition" onClick={() => handleEdit(p)}>Edit</button>
              <button className="px-3 py-1 rounded-full text-sm bg-red-500 text-white hover:scale-105 transition" onClick={() => handleDelete(projectId)}>Delete</button>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}