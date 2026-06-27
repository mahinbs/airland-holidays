import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, ExternalLink } from 'lucide-react';
import { getSupabaseOrNull } from '../../lib/supabase';
import { getEntityConfig, getVirtualStorageColumn, type FieldConfig } from '../config/entities';
import { AdminFieldInput } from '../components/fields/AdminFieldInput';

type GuideMeta = {
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  faqs?: { question: string; answer: string }[];
};

function parseGuideBody(body: string): { cleanBody: string; meta: GuideMeta } {
  const match = body?.match(/<!--CMS-META:([\s\S]*?)-->/);
  if (!match) return { cleanBody: body ?? '', meta: {} };
  try {
    return { cleanBody: body.replace(/<!--CMS-META:[\s\S]*?-->/, '').trim(), meta: JSON.parse(match[1]) as GuideMeta };
  } catch {
    return { cleanBody: body ?? '', meta: {} };
  }
}

function embedGuideMeta(body: string, meta: GuideMeta): string {
  const clean = (body ?? '').replace(/<!--CMS-META:[\s\S]*?-->/, '').trim();
  const hasMeta = meta.seoTitle || meta.seoDescription || meta.tags?.length || meta.faqs?.length;
  if (!hasMeta) return clean;
  return `${clean}\n<!--CMS-META:${JSON.stringify(meta)}-->`;
}

function flattenGuideFields(data: Record<string, unknown>, fields: FieldConfig[]): Record<string, unknown> {
  const { cleanBody, meta } = parseGuideBody(String(data.body ?? ''));
  const flat: Record<string, unknown> = { ...data, body: cleanBody };
  for (const field of fields) {
    if (!field.storageKey) continue;
    const val = meta[field.storageKey as keyof GuideMeta];
    if (val !== undefined) flat[field.name] = val;
  }
  return flat;
}

function assembleGuideFields(form: Record<string, unknown>, fields: FieldConfig[]): Record<string, unknown> {
  const payload: Record<string, unknown> = { ...form };
  const meta: Record<string, unknown> = {};
  for (const field of fields) {
    if (!field.storageKey) continue;
    meta[field.storageKey] = form[field.name];
    delete payload[field.name];
  }
  payload.body = embedGuideMeta(String(form.body ?? ''), meta as GuideMeta);
  return payload;
}

function getPreviewUrl(entityKey: string, form: Record<string, unknown>): string | null {
  const slug = form.slug ?? form.external_id;
  if (!slug || typeof slug !== 'string') return null;
  const map: Record<string, string> = {
    packages: `/packages/${slug}`,
    destinations: `/destinations/${slug}`,
    continents: `/continents/${slug}`,
    visas: `/visa/${slug}`,
    cruises: `/cruises/${slug}`,
    services: `/services/${slug}`,
    guides: `/guide/${slug}`,
  };
  return map[entityKey] ?? null;
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && !Array.isArray(acc)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const keys = path.split('.');
  const result = { ...obj };
  let current: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = current[key] && typeof current[key] === 'object' ? { ...(current[key] as Record<string, unknown>) } : {};
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
  return result;
}

function flattenVirtualFields(
  data: Record<string, unknown>,
  fields: FieldConfig[],
  storageColumn: 'insights' | 'detail' | null
): Record<string, unknown> {
  if (!storageColumn) return data;
  const blob = (data[storageColumn] && typeof data[storageColumn] === 'object' ? data[storageColumn] : {}) as Record<string, unknown>;
  const flat = { ...data };

  for (const field of fields) {
    if (!field.storageKey) continue;
    let val = getNestedValue(blob, field.storageKey);

    if (field.storageKey === 'faqs' && Array.isArray(val)) {
      val = val.map((f: { q?: string; a?: string; question?: string; answer?: string }) => ({
        question: f.question ?? f.q ?? '',
        answer: f.answer ?? f.a ?? '',
      }));
    }
    if (field.storageKey === 'socialGalleryUrls' && Array.isArray(val)) {
      val = val.map((item: unknown) => (typeof item === 'string' ? item : (item as { src?: string })?.src ?? ''));
    }

    flat[field.name] = val ?? (field.type === 'string-list' || field.type === 'image-gallery' || field.type === 'faq-list' ? [] : '');
  }

  return flat;
}

function assembleVirtualFields(
  form: Record<string, unknown>,
  fields: FieldConfig[],
  storageColumn: 'insights' | 'detail' | null
): Record<string, unknown> {
  const payload = { ...form };
  if (!storageColumn) return payload;

  let blob = (payload[storageColumn] && typeof payload[storageColumn] === 'object' ? { ...(payload[storageColumn] as Record<string, unknown>) } : {}) as Record<string, unknown>;

  for (const field of fields) {
    if (!field.storageKey) continue;
    let val = form[field.name];

    if (field.storageKey === 'faqs' && Array.isArray(val)) {
      val = (val as { question: string; answer: string }[]).map((f) => ({
        question: f.question,
        answer: f.answer,
        q: f.question,
        a: f.answer,
      }));
    }
    if (field.storageKey === 'socialGalleryUrls' && Array.isArray(val)) {
      val = (val as string[]).filter(Boolean).map((src) => ({ type: 'image', src, user: 'Guest', text: '' }));
    }

    blob = setNestedValue(blob, field.storageKey, val);
    delete payload[field.name];
  }

  payload[storageColumn] = blob;
  return payload;
}

export default function EntityEdit({ entityKey }: { entityKey: string }) {
  const { id } = useParams();
  const isNew = id === 'new';
  const config = getEntityConfig(entityKey);
  const storageColumn = getVirtualStorageColumn(entityKey);
  const navigate = useNavigate();
  const [form, setForm] = useState<Record<string, unknown>>({ status: 'draft' });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState(config?.sections?.[0]?.key ?? 'all');

  useEffect(() => {
    if (!config || isNew) return;
    const supabase = getSupabaseOrNull();
    if (!supabase) return;
    supabase
      .from(config.table as 'packages')
      .select('*')
      .eq('id', id!)
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          let row = data as Record<string, unknown>;
          if (entityKey === 'guides') row = flattenGuideFields(row, config.fields);
          else if (storageColumn) row = flattenVirtualFields(row, config.fields, storageColumn);
          setForm(row);
        }
        setLoading(false);
      });
  }, [config, id, isNew, storageColumn]);

  if (!config) return <p>Unknown entity</p>;

  const setField = (name: string, value: unknown) => setForm((f) => ({ ...f, [name]: value }));

  const handleSave = async () => {
    setSaving(true);
    const supabase = getSupabaseOrNull();
    if (!supabase) return;

    let payload = entityKey === 'guides'
      ? assembleGuideFields(form, config.fields)
      : assembleVirtualFields(form, config.fields, storageColumn);
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;

    const { error } = isNew
      ? await (supabase.from(config.table as 'packages') as any).insert(payload)
      : await (supabase.from(config.table as 'packages') as any).update(payload).eq('id', id!);

    setSaving(false);
    if (error) {
      alert(error.message);
      return;
    }
    navigate(`/admin/${entityKey}`);
  };

  const visibleFields = config.sections
    ? config.fields.filter((f) => {
        const section = config.sections!.find((s) => s.key === activeSection);
        return section ? section.fieldNames.includes(f.name) : true;
      })
    : config.fields;

  if (loading) return <div className="animate-pulse h-64 bg-white rounded-xl" />;

  return (
    <div>
      <Link to={`/admin/${entityKey}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to {config.plural}
      </Link>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{isNew ? `New ${config.label}` : `Edit ${config.label}`}</h1>
        <div className="flex items-center gap-2">
          {getPreviewUrl(entityKey, form) && (
            <a
              href={getPreviewUrl(entityKey, form)!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <ExternalLink className="w-4 h-4" /> Preview
            </a>
          )}
          <button onClick={handleSave} disabled={saving} className="btn-primary gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {config.sections && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {config.sections.map((section) => (
            <button
              key={section.key}
              type="button"
              onClick={() => setActiveSection(section.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeSection === section.key ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {visibleFields.map((field) => (
          <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
            {!['string-list', 'image-gallery', 'faq-list', 'itinerary', 'richtext', 'media', 'video', 'package-select', 'policy-table', 'repeatable'].includes(field.type) && (
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
            )}
            <AdminFieldInput field={field} value={form[field.name]} onChange={(v) => setField(field.name, v)} />
          </div>
        ))}
      </div>
    </div>
  );
}
