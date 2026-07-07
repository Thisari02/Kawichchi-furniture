import { useEffect, useState } from 'react';
import { categories } from '../data/categories';
import type { Project } from '../types/project';
import { getApiBase } from '../../lib/apiBase';

const API_BASE = getApiBase('/api');

const initialForm: Project = {
  id: undefined,
  title: '',
  category: '',
  subCategory: '',
  subType: '',
  location: '',
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
  const [message, setMessage] = useState<string>('');
  const [imageUrlInput, setImageUrlInput] = useState<string>('');

  const subCategories =
    categories.find((c) => c.name === form.category)?.subCategories || [];

  const subTypes =
    subCategories.find((s) => s.name === form.subCategory)?.subTypes || [];

  const loadProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/projects`, { cache: 'no-store' });
      const data = await res.json();
      const normalized = Array.isArray(data) ? data : [];
      normalized.sort((a: any, b: any) => {
        const aTime = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      });
      setProjects(normalized);
    } catch {
      setMessage('Unable to load projects. Please check API connection.');
    }
  };

  // Load projects
  useEffect(() => {
    void loadProjects();
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

  const parseImageUrls = (raw: string) => {
    return raw
      .split(/[\n,]/g)
      .map((url) => url.trim())
      .filter(Boolean);
  };

  const handleAddImageUrls = () => {
    const parsed = parseImageUrls(imageUrlInput);

    if (!parsed.length) {
      setMessage('No valid image URLs to add.');
      return;
    }

    setForm((prev) => {
      const existing = Array.isArray(prev.images) ? prev.images : [];
      const unique = [...new Set([...existing, ...parsed])];
      return { ...prev, images: unique };
    });

    setImageUrlInput('');
    setMessage(`${parsed.length} image URL(s) added.`);
  };

  const handleRemoveImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setMessage('');
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

    await loadProjects();
    setForm(initialForm);
    setImageUrlInput('');
    setEditingId(null);
    setMessage(editingId ? 'Project updated successfully.' : 'Project created successfully.');
    setLoading(false);
  };

  const handleEdit = (p: any) => {
    setForm({
      ...initialForm,
      ...p,
      images: Array.isArray(p?.images) ? p.images : [],
      description: p?.description || '',
      customizationNote: p?.customizationNote || '',
      location: p?.location || '',
    });
    setImageUrlInput('');
    setEditingId(String(p._id ?? p.id ?? ''));
  };

  const handleDelete = async (id: string | number) => {
    setMessage('');
    await fetch(`${API_BASE}/api/admin/projects/${id}`, {
      method: 'DELETE',
    });

    await loadProjects();
    setMessage('Project deleted successfully.');
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
    <div className="section-shell px-4 sm:px-6 bg-transparent text-[var(--lux-text)]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="lux-tag mb-3">Management</p>
            <h2 className="text-4xl md:text-5xl font-serif lux-section-title">Admin Panel</h2>
            <p className="mt-3 max-w-2xl text-[var(--lux-text-soft)]">
              Manage project listings with the same premium presentation system used on the public site.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--lux-border)] bg-[var(--lux-surface)]/80 px-4 py-3 text-sm text-[var(--lux-text-soft)] shadow-[var(--lux-shadow-soft)]">
            Drag projects to reorder, edit content, and keep the gallery flow curated.
          </div>
        </div>

      {message ? (
        <p className="mb-6 rounded-2xl border border-[var(--lux-border)] bg-[var(--lux-surface)]/80 px-4 py-3 text-sm text-[var(--lux-text)] shadow-[var(--lux-shadow-soft)]">
          {message}
        </p>
      ) : null}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl lux-card p-5 md:p-6 mb-10">

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="rounded-xl border border-[var(--lux-border)] bg-[var(--lux-bg-elevated)]/75 p-3 text-[var(--lux-text)] outline-none focus:border-[var(--lux-bronze)]"
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
          className="rounded-xl border border-[var(--lux-border)] bg-[var(--lux-bg-elevated)]/75 p-3 text-[var(--lux-text)] outline-none focus:border-[var(--lux-bronze)]"
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
          className="rounded-xl border border-[var(--lux-border)] bg-[var(--lux-bg-elevated)]/75 p-3 text-[var(--lux-text)] outline-none focus:border-[var(--lux-bronze)]"
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
          className="rounded-xl border border-[var(--lux-border)] bg-[var(--lux-bg-elevated)]/75 p-3 text-[var(--lux-text)] outline-none focus:border-[var(--lux-bronze)]"
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
          value={form.description || ''}
          onChange={handleChange}
          placeholder="Description"
          className="min-h-[110px] rounded-xl border border-[var(--lux-border)] bg-[var(--lux-bg-elevated)]/75 p-3 text-[var(--lux-text)] outline-none focus:border-[var(--lux-bronze)]"
        />

        <input
          name="location"
          value={form.location || ''}
          onChange={handleChange}
          placeholder="Location"
          className="rounded-xl border border-[var(--lux-border)] bg-[var(--lux-bg-elevated)]/75 p-3 text-[var(--lux-text)] outline-none focus:border-[var(--lux-bronze)]"
        />

        <label className="text-sm tracking-[0.14em] uppercase text-[var(--lux-text-soft)]">Upload images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="rounded-xl border border-[var(--lux-border)] bg-[var(--lux-bg-elevated)]/75 p-3 text-[var(--lux-text)]"
        />

        <div className="rounded-2xl border border-[var(--lux-border)] bg-[var(--lux-surface)]/70 p-4">
          <p className="mb-2 text-xs text-[var(--lux-text-soft)]">
            Paste multiple image URLs separated by commas or new lines.
          </p>
          <textarea
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            placeholder="https://.../image1.jpg, https://.../image2.jpg"
            className="mb-3 min-h-[96px] w-full rounded-xl border border-[var(--lux-border)] bg-[var(--lux-bg-elevated)]/75 p-3 text-[var(--lux-text)] outline-none focus:border-[var(--lux-bronze)]"
          />
          <button
            type="button"
            onClick={handleAddImageUrls}
            className="rounded-full border border-[var(--lux-border)] bg-[var(--lux-bronze)]/18 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--lux-text)] transition hover:bg-[var(--lux-bronze)]/28"
          >
            Add Image URLs
          </button>
        </div>

        {(form.images || []).length > 0 && (
          <div className="rounded-2xl border border-[var(--lux-border)] bg-[var(--lux-surface)]/70 p-4">
            <p className="mb-2 text-xs text-[var(--lux-text-soft)]">
              Added images ({form.images?.length || 0})
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(form.images || []).map((img, idx) => (
                <div key={`${img}-${idx}`} className="relative overflow-hidden rounded-xl border border-[var(--lux-border)]">
                  <img src={img} alt={`admin-preview-${idx + 1}`} className="h-24 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute right-1 top-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <input
          name="customizationNote"
          value={form.customizationNote || ''}
          onChange={handleChange}
          placeholder="Customization Note"
          className="rounded-xl border border-[var(--lux-border)] bg-[var(--lux-bg-elevated)]/75 p-3 text-[var(--lux-text)] outline-none focus:border-[var(--lux-bronze)]"
        />

        <button className="rounded-full bg-[var(--lux-bronze)] px-5 py-3 font-medium uppercase tracking-[0.16em] text-black disabled:opacity-60">
          {editingId ? 'Update' : 'Create'}
        </button>
      </form>

      {/* LIST */}
      <div className="mt-8 space-y-3">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--lux-bronze)]">
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
            className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center p-5 rounded-2xl bg-[var(--lux-surface)]/80 shadow-[var(--lux-shadow-soft)] hover:shadow-[var(--lux-shadow-card)] transition border border-[var(--lux-border)]"
          >
            <div>
              <p className="mb-1 text-xs text-[var(--lux-bronze)]">#{index + 1}</p>
              <b className="text-lg">{p.title}</b>
              <p className="text-sm text-[var(--lux-text-soft)]">
                {p.category} → {p.subCategory} → {p.subType}
              </p>
              <p className="text-xs text-[var(--lux-text-soft)]">
                <span className="font-semibold">Location:</span> {p.location || 'Not set'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="px-3 py-1 rounded-full text-sm bg-[var(--lux-bronze)]/20 text-[var(--lux-text)] hover:scale-105 transition"
                onClick={() => moveProject(index, index - 1)}
              >
                ↑
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded-full text-sm bg-[var(--lux-bronze)]/20 text-[var(--lux-text)] hover:scale-105 transition"
                onClick={() => moveProject(index, index + 1)}
              >
                ↓
              </button>
              <button className="px-3 py-1 rounded-full text-sm bg-[var(--lux-bg-elevated)] text-[var(--lux-text)] hover:scale-105 transition" onClick={() => handleEdit(p)}>Edit</button>
              <button className="px-3 py-1 rounded-full text-sm bg-red-500 text-white hover:scale-105 transition" onClick={() => handleDelete(projectId)}>Delete</button>
            </div>
          </div>
        )})}
      </div>
      </div>
    </div>
  );
}