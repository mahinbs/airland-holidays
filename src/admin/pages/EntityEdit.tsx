import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, ExternalLink, Send, Eye } from 'lucide-react';
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Public URL used for "Preview" — appends ?preview=1 so draft content is visible to signed-in admins. */
function getPreviewUrl(entityKey: string, form: Record<string, unknown>): string {
  const slug = form.slug ?? form.external_id;
  const s = typeof slug === 'string' && slug ? slug : null;
  const detail: Record<string, string | null> = {
    packages: s && `/packages/${s}`,
    destinations: s && `/destinations/${s}`,
    continents: s && `/continents/${s}`,
    visas: s && `/visa/${s}`,
    cruises: s && `/cruises/${s}`,
    services: s && `/services/${s}`,
    guides: s && `/guide/${s}`,
  };
  const listing: Record<string, string> = {
    packages: '/packages',
    destinations: '/destinations',
    continents: '/destinations',
    visas: '/visa',
    cruises: '/cruises',
    services: '/services',
    guides: '/guide',
    testimonials: '/testimonials',
    gallery: '/gallery',
    'media-videos': '/media',
    'media-events': '/media',
  };
  const path = detail[entityKey] ?? listing[entityKey] ?? '/';
  return `${path}?preview=1`;
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
      val = val.map((f: { q?: string; a?: string; question?: string; answer?: string; enabled?: boolean }) => ({
        question: f.question ?? f.q ?? '',
        answer: f.answer ?? f.a ?? '',
        enabled: f.enabled !== false,
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
      val = (val as { question: string; answer: string; enabled?: boolean }[]).map((f) => ({
        question: f.question,
        answer: f.answer,
        q: f.question,
        a: f.answer,
        enabled: f.enabled !== false,
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

const LONG_FIELD_TYPES = ['string-list', 'image-gallery', 'faq-list', 'itinerary', 'richtext', 'media', 'video', 'package-select', 'cruise-select', 'policy-table', 'repeatable', 'multi-select'];

/** PostgREST reports unknown columns as: Could not find the 'x' column of 'table' in the schema cache */
function missingColumn(message: string): string | null {
  const m = message.match(/Could not find the '([^']+)' column/) ?? message.match(/column "?([\w]+)"? .*does not exist/i);
  return m ? m[1] : null;
}

export default function EntityEdit({ entityKey }: { entityKey: string }) {
  const { id } = useParams();
  const isNew = id === 'new';
  const config = getEntityConfig(entityKey);
  const storageColumn = getVirtualStorageColumn(entityKey);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<Record<string, unknown>>({ status: 'draft' });
  const [loading, setLoading] = useState(!isNew && Boolean(getSupabaseOrNull()));
  const [saving, setSaving] = useState<null | 'save' | 'publish' | 'preview'>(null);
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState<{ type: 'ok' | 'warn' | 'err'; text: string } | null>(null);
  const [activeSection, setActiveSection] = useState(config?.sections?.[0]?.key ?? 'all');
  const slugTouched = useRef(false);
  const savedId = useRef<string | null>(null);

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
          slugTouched.current = true;
        }
        setLoading(false);
      });
  }, [config, id, isNew, storageColumn, entityKey]);

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  const setField = useCallback(
    (name: string, value: unknown) => {
      setDirty(true);
      setForm((f) => {
        const next = { ...f, [name]: value };
        // New records: derive the slug from the title/name until the editor edits the slug by hand.
        if (config?.slugField && !slugTouched.current && isNew) {
          if (name === config.slugField) slugTouched.current = true;
          else if ((name === 'title' || name === 'name') && typeof value === 'string') next[config.slugField] = slugify(value);
        }
        return next;
      });
    },
    [config, isNew]
  );

  if (!config) return <p>Unknown entity</p>;

  const missingRequired = () =>
    config.fields.filter((f) => f.required && (form[f.name] === undefined || form[f.name] === null || String(form[f.name]).trim() === '')).map((f) => f.label);

  /** Saves the record. Returns the saved row id (or null on failure). */
  const persist = async (overrides: Record<string, unknown> = {}): Promise<string | null> => {
    const supabase = getSupabaseOrNull();
    if (!supabase) {
      setNotice({ type: 'err', text: 'Supabase is not configured — cannot save.' });
      return null;
    }
    const merged = { ...form, ...overrides };
    const missing = config.fields.filter((f) => f.required && String(merged[f.name] ?? '').trim() === '').map((f) => f.label);
    if (missing.length) {
      setNotice({ type: 'err', text: `Please fill in: ${missing.join(', ')}` });
      return null;
    }

    const payload: Record<string, unknown> =
      entityKey === 'guides' ? assembleGuideFields(merged, config.fields) : assembleVirtualFields(merged, config.fields, storageColumn);
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;

    const dropped: string[] = [];
    // Tolerate databases that have not had the latest CMS migration applied: drop unknown columns and retry.
    for (let attempt = 0; attempt < 6; attempt++) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const table = supabase.from(config.table as 'packages') as any;
      const res = isNew && !savedId.current
        ? await table.insert(payload).select('id').single()
        : await table.update(payload).eq('id', savedId.current ?? id!).select('id').single();
      if (!res.error) {
        if (dropped.length) {
          setNotice({
            type: 'warn',
            text: `Saved, but these fields could not be stored yet: ${dropped.join(', ')}. Run supabase/migrations/004_cms_enhancements.sql in Supabase, then save again.`,
          });
        }
        savedId.current = res.data?.id ?? savedId.current ?? id ?? null;
        qc.invalidateQueries({ queryKey: ['admin', config.table] });
        setDirty(false);
        return savedId.current;
      }
      const col = missingColumn(res.error.message);
      if (col && col in payload) {
        dropped.push(col);
        delete payload[col];
        continue;
      }
      setNotice({ type: 'err', text: res.error.message });
      return null;
    }
    setNotice({ type: 'err', text: 'Could not save — too many unknown columns. Run the latest CMS migration.' });
    return null;
  };

  const handleSave = async (mode: 'save' | 'publish') => {
    setSaving(mode);
    setNotice(null);
    const overrides = mode === 'publish' ? { status: 'published' } : {};
    if (mode === 'publish') setForm((f) => ({ ...f, status: 'published' }));
    const savedRow = await persist(overrides);
    setSaving(null);
    if (savedRow) navigate(`/admin/${entityKey}`);
  };

  const handlePreview = async () => {
    setSaving('preview');
    setNotice(null);
    const url = getPreviewUrl(entityKey, form);
    const savedRow = await persist();
    setSaving(null);
    if (!savedRow) return;
    window.open(url, '_blank', 'noopener');
    if (isNew) navigate(`/admin/${entityKey}/${savedRow}`, { replace: true });
    else setNotice({ type: 'ok', text: 'Saved. Preview opened in a new tab (drafts are visible while you are signed in).' });
  };

  const visibleFields = config.sections
    ? config.fields.filter((f) => {
        const section = config.sections!.find((s) => s.key === activeSection);
        return section ? section.fieldNames.includes(f.name) : true;
      })
    : config.fields;

  if (loading) return <div className="animate-pulse h-64 bg-white rounded-xl" />;

  const status = (form.status as string) ?? 'draft';
  const hasStatus = config.fields.some((f) => f.name === 'status');
  const required = missingRequired();

  return (
    <div>
      <Link to={`/admin/${entityKey}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to {config.plural}
      </Link>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">{isNew ? `New ${config.label}` : `Edit ${config.label}`}</h1>
          {hasStatus && (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {status === 'published' ? 'Published' : 'Draft'}
            </span>
          )}
          {dirty && <span className="text-xs text-slate-400">Unsaved changes</span>}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => void handlePreview()}
            disabled={saving !== null}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            title="Saves your changes, then opens the live page with drafts visible"
          >
            <Eye className="w-4 h-4" /> {saving === 'preview' ? 'Saving…' : 'Save & Preview'}
          </button>
          <button
            type="button"
            onClick={() => void handleSave('save')}
            disabled={saving !== null}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-primary text-primary text-sm font-medium hover:bg-primary/5 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {saving === 'save' ? 'Saving…' : hasStatus && status === 'published' ? 'Save changes' : 'Save'}
          </button>
          {hasStatus && status !== 'published' && (
            <button type="button" onClick={() => void handleSave('publish')} disabled={saving !== null} className="btn-primary gap-2 disabled:opacity-50">
              <Send className="w-4 h-4" /> {saving === 'publish' ? 'Publishing…' : 'Publish'}
            </button>
          )}
        </div>
      </div>

      {notice && (
        <div
          className={`mb-4 px-4 py-3 rounded-xl text-sm border ${
            notice.type === 'ok' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : notice.type === 'warn' ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {notice.text}
        </div>
      )}
      {required.length > 0 && !isNew && (
        <p className="mb-3 text-xs text-amber-700">Required fields still empty: {required.join(', ')}</p>
      )}

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
          <div key={field.name} className={field.fullWidth || LONG_FIELD_TYPES.includes(field.type) ? 'md:col-span-2' : ''}>
            {!LONG_FIELD_TYPES.includes(field.type) && (
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>
            )}
            <AdminFieldInput field={field} value={form[field.name]} onChange={(v) => setField(field.name, v)} />
          </div>
        ))}
      </div>
      {!isNew && (
        <p className="mt-4 text-xs text-slate-400 flex items-center gap-1">
          <ExternalLink className="w-3 h-3" /> Live page:{' '}
          <a className="underline hover:text-primary" href={getPreviewUrl(entityKey, form).replace('?preview=1', '')} target="_blank" rel="noopener noreferrer">
            {getPreviewUrl(entityKey, form).replace('?preview=1', '')}
          </a>
        </p>
      )}
    </div>
  );
}
