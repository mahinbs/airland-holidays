import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Save, Trash2 } from 'lucide-react';
import { getSupabaseOrNull } from '../../lib/supabase';
import { fetchSiteSetting, upsertSiteSetting } from '../../services/content';
import RichTextField from '../components/fields/RichTextField';
import { FieldLabel, ReorderButtons, Toggle, inputClass, moveItem, useSortable } from '../components/fields/shared';

const MODULES = [
  { value: 'global', label: 'Global FAQ Page' },
  { value: 'package', label: 'Packages' },
  { value: 'visa', label: 'Visa' },
  { value: 'cruise', label: 'Cruises' },
  { value: 'service', label: 'Services' },
  { value: 'destination', label: 'Destinations' },
  { value: 'payment', label: 'Payment' },
] as const;

type ModuleMap = Record<string, string>;

type FaqQuestion = {
  id: string;
  question: string;
  answer: string;
  enabled: boolean;
  /** '' = inherit the category's module */
  module: string;
};

type FaqCategory = {
  id: string;
  name: string;
  status: 'draft' | 'published';
  module: string;
  questions: FaqQuestion[];
};

let localId = 0;
const newId = () => `new-${Date.now()}-${localId++}`;
const isNew = (id: string) => id.startsWith('new-');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = (name: string) => getSupabaseOrNull()?.from(name as 'faq_categories') as any;

async function loadFaqAdmin(): Promise<{ cats: FaqCategory[]; catMap: ModuleMap; itemMap: ModuleMap }> {
  const supabase = getSupabaseOrNull();
  if (!supabase) return { cats: [], catMap: {}, itemMap: {} };
  const [catRes, catMap, itemMap] = await Promise.all([
    db('faq_categories').select('*').order('sort_order'),
    fetchSiteSetting<ModuleMap>('faq_module_mapping'),
    fetchSiteSetting<ModuleMap>('faq_item_module_mapping'),
  ]);
  const cats = (catRes.data ?? []) as { id: string; name: string; status: 'draft' | 'published' }[];
  const itemsRes = cats.length
    ? await db('faq_items')
        .select('*')
        .in('category_id', cats.map((c) => c.id))
        .order('sort_order')
    : { data: [] };
  const items = (itemsRes.data ?? []) as { id: string; category_id: string; question: string; answer: string; enabled?: boolean | null }[];
  return {
    catMap: catMap ?? {},
    itemMap: itemMap ?? {},
    cats: cats.map((c) => ({
      id: c.id,
      name: c.name,
      status: c.status,
      module: (catMap ?? {})[c.id] ?? 'global',
      questions: items
        .filter((i) => i.category_id === c.id)
        .map((i) => ({
          id: i.id,
          question: i.question,
          answer: i.answer ?? '',
          enabled: i.enabled !== false,
          module: (itemMap ?? {})[i.id] ?? '',
        })),
    })),
  };
}

const errorMessage = (e: unknown) => (e instanceof Error ? e.message : typeof e === 'object' && e && 'message' in e ? String((e as { message: unknown }).message) : 'Unknown error');

export default function AdminFaq() {
  const qc = useQueryClient();
  const { data, isLoading, refetch } = useQuery({ queryKey: ['admin', 'faq'], queryFn: loadFaqAdmin });
  const [cats, setCats] = useState<FaqCategory[]>([]);
  const [deleted, setDeleted] = useState<{ cats: string[]; items: string[] }>({ cats: [], items: [] });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: 'ok' | 'warn' | 'err'; text: string } | null>(null);
  const hydrated = useRef(false);

  // Load server state once (and again after every save via refetch + resetFromServer).
  useEffect(() => {
    if (data && !hydrated.current) {
      setCats(data.cats);
      hydrated.current = true;
    }
  }, [data]);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  const change = (next: FaqCategory[]) => {
    setCats(next);
    setDirty(true);
  };

  const updateCat = (id: string, patch: Partial<FaqCategory>) => change(cats.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const catSortable = useSortable(cats, change);

  const addCategory = () => change([...cats, { id: newId(), name: 'New Category', status: 'draft', module: 'global', questions: [] }]);

  const removeCategory = (cat: FaqCategory) => {
    if (!confirm(`Delete category "${cat.name}" and all ${cat.questions.length} question(s) in it?`)) return;
    if (!isNew(cat.id)) {
      setDeleted((d) => ({
        cats: [...d.cats, cat.id],
        items: [...d.items, ...cat.questions.filter((q) => !isNew(q.id)).map((q) => q.id)],
      }));
    }
    change(cats.filter((c) => c.id !== cat.id));
  };

  const removeQuestion = (cat: FaqCategory, q: FaqQuestion) => {
    if (!isNew(q.id)) setDeleted((d) => ({ ...d, items: [...d.items, q.id] }));
    updateCat(cat.id, { questions: cat.questions.filter((x) => x.id !== q.id) });
  };

  const moveQuestionToCategory = (from: FaqCategory, q: FaqQuestion, toId: string) => {
    if (from.id === toId) return;
    change(
      cats.map((c) => {
        if (c.id === from.id) return { ...c, questions: c.questions.filter((x) => x.id !== q.id) };
        if (c.id === toId) return { ...c, questions: [...c.questions, q] };
        return c;
      })
    );
  };

  const save = async () => {
    const supabase = getSupabaseOrNull();
    if (!supabase) {
      setNotice({ type: 'err', text: 'Supabase is not configured.' });
      return;
    }
    setSaving(true);
    setNotice(null);
    let enabledColumnMissing = false;
    try {
      // 1. deletions (items first, then categories)
      if (deleted.items.length) {
        const { error } = await db('faq_items').delete().in('id', deleted.items);
        if (error) throw error;
      }
      if (deleted.cats.length) {
        const { error } = await db('faq_categories').delete().in('id', deleted.cats);
        if (error) throw error;
      }

      const catMap: ModuleMap = {};
      const itemMap: ModuleMap = {};

      // 2. categories then their questions, in display order
      for (let ci = 0; ci < cats.length; ci++) {
        const cat = cats[ci];
        let categoryId = cat.id;
        const catPayload = { name: cat.name.trim() || 'Untitled', status: cat.status, sort_order: ci };
        if (isNew(cat.id)) {
          const { data: row, error } = await db('faq_categories').insert(catPayload).select('id').single();
          if (error) throw error;
          categoryId = row.id as string;
        } else {
          const { error } = await db('faq_categories').update(catPayload).eq('id', cat.id);
          if (error) throw error;
        }
        catMap[categoryId] = cat.module;

        for (let qi = 0; qi < cat.questions.length; qi++) {
          const q = cat.questions[qi];
          const base = { category_id: categoryId, question: q.question, answer: q.answer, sort_order: qi };
          const payload: Record<string, unknown> = { ...base, enabled: q.enabled };
          const write = (body: Record<string, unknown>) =>
            isNew(q.id)
              ? db('faq_items').insert(body).select('id').single()
              : db('faq_items').update(body).eq('id', q.id).select('id').single();
          let res = await write(enabledColumnMissing ? base : payload);
          if (res.error && /enabled/.test(res.error.message) && !enabledColumnMissing) {
            // Migration 004 not applied yet — save everything else and warn at the end
            enabledColumnMissing = true;
            res = await write(base);
          }
          if (res.error) throw res.error;
          if (q.module) itemMap[res.data.id as string] = q.module;
        }
      }

      // 3. module mapping settings
      await Promise.all([upsertSiteSetting('faq_module_mapping', catMap), upsertSiteSetting('faq_item_module_mapping', itemMap)]);

      setDeleted({ cats: [], items: [] });
      setDirty(false);
      hydrated.current = false;
      await Promise.all([qc.invalidateQueries({ queryKey: ['faq'] }), refetch()]);
      setNotice(
        enabledColumnMissing
          ? { type: 'warn', text: 'Saved, but Enable / Disable could not be stored. Run supabase/migrations/004_cms_enhancements.sql in Supabase, then save again.' }
          : { type: 'ok', text: 'FAQ changes saved.' }
      );
    } catch (e) {
      setNotice({ type: 'err', text: `Save failed: ${errorMessage(e)}` });
    }
    setSaving(false);
  };

  if (isLoading) return <div className="animate-pulse h-48 bg-white rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">FAQ Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            One central FAQ library. Assign each category — or an individual question — to Packages, Visa, Cruises, Services, Destinations, Payment or the global FAQ page. A FAQ
            only appears on the module it is assigned to.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dirty && <span className="text-xs text-amber-600 font-medium">Unsaved changes</span>}
          <button onClick={addCategory} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Plus className="w-4 h-4" /> Add Category
          </button>
          <button onClick={() => void save()} disabled={saving || !dirty} className="btn-primary gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Changes'}
          </button>
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

      <p className="text-xs text-slate-500 mb-4">
        Package, Visa, Cruise and Service pages also have their own FAQ tab on each record's edit page — those are shown only on that record.
      </p>

      <div className="space-y-6">
        {cats.map((cat, catIndex) => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            index={catIndex}
            total={cats.length}
            allCats={cats}
            rowProps={catSortable.rowProps(catIndex)}
            rowClass={catSortable.rowClass(catIndex)}
            handleProps={catSortable.handleProps(catIndex)}
            onMove={(from, to) => change(moveItem(cats, from, to))}
            onChange={(patch) => updateCat(cat.id, patch)}
            onRemove={() => removeCategory(cat)}
            onRemoveQuestion={(q) => removeQuestion(cat, q)}
            onMoveQuestion={(q, toId) => moveQuestionToCategory(cat, q, toId)}
          />
        ))}
        {cats.length === 0 && <p className="text-slate-500">No FAQ categories. Add one to get started.</p>}
      </div>
    </div>
  );
}

function CategoryCard({
  cat,
  index,
  total,
  allCats,
  rowProps,
  rowClass,
  handleProps,
  onMove,
  onChange,
  onRemove,
  onRemoveQuestion,
  onMoveQuestion,
}: {
  cat: FaqCategory;
  index: number;
  total: number;
  allCats: FaqCategory[];
  rowProps: ReturnType<ReturnType<typeof useSortable<FaqCategory>>['rowProps']>;
  rowClass: string;
  handleProps: ReturnType<ReturnType<typeof useSortable<FaqCategory>>['handleProps']>;
  onMove: (from: number, to: number) => void;
  onChange: (patch: Partial<FaqCategory>) => void;
  onRemove: () => void;
  onRemoveQuestion: (q: FaqQuestion) => void;
  onMoveQuestion: (q: FaqQuestion, toCategoryId: string) => void;
}) {
  const questionSortable = useSortable(cat.questions, (next) => onChange({ questions: next }));

  const updateQuestion = (id: string, patch: Partial<FaqQuestion>) =>
    onChange({ questions: cat.questions.map((q) => (q.id === id ? { ...q, ...patch } : q)) });

  return (
    <div {...rowProps} className={`bg-white rounded-xl border border-slate-200 p-5 transition-opacity ${rowClass}`}>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <ReorderButtons index={index} total={total} onMove={onMove} handleProps={handleProps} />
        <input
          className="font-bold text-lg text-slate-900 border-b border-slate-200 focus:border-primary outline-none flex-1 min-w-[200px] py-1"
          value={cat.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Category name"
        />
        <label className="text-xs text-slate-500 flex items-center gap-2">
          Shown on
          <select value={cat.module} onChange={(e) => onChange({ module: e.target.value })} className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800">
            {MODULES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
        <Toggle
          checked={cat.status === 'published'}
          onChange={(v) => onChange({ status: v ? 'published' : 'draft' })}
          label={cat.status === 'published' ? 'Published' : 'Draft'}
        />
        <button type="button" onClick={onRemove} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" aria-label="Delete category" title="Delete category">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {cat.questions.map((q, qi) => (
          <div
            key={q.id}
            {...questionSortable.rowProps(qi)}
            className={`flex gap-2 border border-slate-200 rounded-xl p-3 bg-slate-50 transition-opacity ${q.enabled ? '' : 'opacity-60'} ${questionSortable.rowClass(qi)}`}
          >
            <ReorderButtons index={qi} total={cat.questions.length} onMove={(f, t) => onChange({ questions: moveItem(cat.questions, f, t) })} handleProps={questionSortable.handleProps(qi)} />
            <div className="flex-1 min-w-0 space-y-2">
              <input
                className={`${inputClass} font-medium`}
                value={q.question}
                placeholder="Question"
                onChange={(e) => updateQuestion(q.id, { question: e.target.value })}
              />
              <RichTextField label="Answer" value={q.answer} onChange={(v) => updateQuestion(q.id, { answer: v })} minHeight={120} hint="" />
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Toggle checked={q.enabled} onChange={(v) => updateQuestion(q.id, { enabled: v })} label={q.enabled ? 'Enabled' : 'Disabled'} />
                <label className="text-xs text-slate-500 flex items-center gap-2">
                  Module
                  <select
                    value={q.module}
                    onChange={(e) => updateQuestion(q.id, { module: e.target.value })}
                    className="text-sm border border-slate-300 rounded-lg px-2 py-1 text-slate-800"
                  >
                    <option value="">Same as category</option>
                    {MODULES.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </label>
                {allCats.length > 1 && (
                  <label className="text-xs text-slate-500 flex items-center gap-2">
                    Move to
                    <select
                      value=""
                      onChange={(e) => e.target.value && onMoveQuestion(q, e.target.value)}
                      className="text-sm border border-slate-300 rounded-lg px-2 py-1 text-slate-800"
                    >
                      <option value="">Category…</option>
                      {allCats
                        .filter((c) => c.id !== cat.id)
                        .map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </label>
                )}
                <button type="button" onClick={() => onRemoveQuestion(q)} className="ml-auto text-red-500 hover:bg-red-50 rounded-lg px-2 py-1 text-xs flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Delete question
                </button>
              </div>
            </div>
          </div>
        ))}
        {cat.questions.length === 0 && <FieldLabel label="No questions yet" />}
      </div>
      <button
        type="button"
        onClick={() => onChange({ questions: [...cat.questions, { id: newId(), question: '', answer: '', enabled: true, module: '' }] })}
        className="text-sm text-primary hover:underline mt-3 inline-flex items-center gap-1"
      >
        <Plus className="w-4 h-4" /> Add Question
      </button>
    </div>
  );
}
