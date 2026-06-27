import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSupabaseOrNull } from '../../lib/supabase';
import { fetchSiteSetting, upsertSiteSetting } from '../../services/content';
import RichTextField from '../components/fields/RichTextField';

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

async function fetchFaqAdmin() {
  const supabase = getSupabaseOrNull();
  if (!supabase) return [];
  const db = (name: string) => supabase.from(name as 'faq_categories') as any;
  const { data: cats } = await db('faq_categories').select('*').order('sort_order');
  if (!cats?.length) return [];
  const { data: items } = await db('faq_items').select('*').in('category_id', cats.map((c: { id: string }) => c.id)).order('sort_order');
  return cats.map((cat: { id: string; name: string; status: string; sort_order: number }) => ({
    ...cat,
    questions: (items ?? []).filter((i: { category_id: string }) => i.category_id === cat.id),
  }));
}

export default function AdminFaq() {
  const qc = useQueryClient();
  const { data: categories = [], isLoading } = useQuery({ queryKey: ['admin', 'faq'], queryFn: fetchFaqAdmin });
  const [moduleMap, setModuleMap] = useState<ModuleMap>({});

  useEffect(() => {
    fetchSiteSetting<ModuleMap>('faq_module_mapping').then((m) => setModuleMap(m ?? {}));
  }, []);

  const saveModule = async (categoryId: string, module: string) => {
    const next = { ...moduleMap, [categoryId]: module };
    setModuleMap(next);
    await upsertSiteSetting('faq_module_mapping', next);
  };

  const moveCategory = async (index: number, direction: -1 | 1) => {
    const supabase = getSupabaseOrNull();
    if (!supabase) return;
    const target = index + direction;
    if (target < 0 || target >= categories.length) return;
    const a = categories[index] as { id: string; sort_order: number };
    const b = categories[target] as { id: string; sort_order: number };
    await (supabase.from('faq_categories') as any).update({ sort_order: b.sort_order }).eq('id', a.id);
    await (supabase.from('faq_categories') as any).update({ sort_order: a.sort_order }).eq('id', b.id);
    qc.invalidateQueries({ queryKey: ['admin', 'faq'] });
  };

  const addCategory = async () => {
    const supabase = getSupabaseOrNull();
    if (!supabase) return;
    await (supabase.from('faq_categories') as any).insert({ name: 'New Category', status: 'draft', sort_order: categories.length });
    qc.invalidateQueries({ queryKey: ['admin', 'faq'] });
  };

  const addQuestion = async (categoryId: string) => {
    const supabase = getSupabaseOrNull();
    if (!supabase) return;
    await (supabase.from('faq_items') as any).insert({ category_id: categoryId, question: 'New question?', answer: 'Answer here.', sort_order: 0 });
    qc.invalidateQueries({ queryKey: ['admin', 'faq'] });
  };

  if (isLoading) return <div className="animate-pulse h-48 bg-white rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">FAQ Management</h1>
          <p className="text-slate-500 text-sm mt-1">Global FAQs with module mapping. Entity-specific FAQs are managed on each Package, Visa, Cruise or Service edit page.</p>
        </div>
        <button onClick={addCategory} className="btn-primary gap-2"><Plus className="w-4 h-4" /> Add Category</button>
      </div>
      <div className="space-y-6">
        {categories.map((cat: Record<string, unknown>, catIndex: number) => (
          <div key={cat.id as string} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <button type="button" onClick={() => moveCategory(catIndex, -1)} className="p-1 text-slate-400 hover:text-primary"><ChevronUp className="w-4 h-4" /></button>
                <button type="button" onClick={() => moveCategory(catIndex, 1)} className="p-1 text-slate-400 hover:text-primary"><ChevronDown className="w-4 h-4" /></button>
                <input
                  className="font-bold text-lg text-slate-900 border-b border-transparent focus:border-primary outline-none flex-1"
                  defaultValue={cat.name as string}
                  onBlur={async (e) => {
                    const supabase = getSupabaseOrNull();
                    if (!supabase) return;
                    await (supabase.from('faq_categories') as any).update({ name: e.target.value }).eq('id', cat.id as string);
                  }}
                />
              </div>
              <select
                value={moduleMap[cat.id as string] ?? 'global'}
                onChange={(e) => saveModule(cat.id as string, e.target.value)}
                className="text-sm border border-slate-300 rounded-lg px-3 py-1.5"
              >
                {MODULES.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              <select
                defaultValue={cat.status as string}
                onChange={async (e) => {
                  const supabase = getSupabaseOrNull();
                  if (!supabase) return;
                  await (supabase.from('faq_categories') as any).update({ status: e.target.value }).eq('id', cat.id as string);
                  qc.invalidateQueries({ queryKey: ['admin', 'faq'] });
                }}
                className="text-sm border border-slate-300 rounded-lg px-2 py-1"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            {(cat.questions as Record<string, unknown>[])?.map((q) => (
              <div key={q.id as string} className="border border-slate-100 rounded-lg p-3 mb-2">
                <input className="w-full font-medium text-slate-800 mb-2 border-b border-slate-100 focus:border-primary outline-none text-sm" defaultValue={q.question as string}
                  onBlur={async (e) => { const s = getSupabaseOrNull(); if (s) await (s.from('faq_items') as any).update({ question: e.target.value }).eq('id', q.id as string); }} />
                <RichTextField
                  label="Answer"
                  value={(q.answer as string) ?? ''}
                  onChange={async (v) => { const s = getSupabaseOrNull(); if (s) await (s.from('faq_items') as any).update({ answer: v }).eq('id', q.id as string); }}
                />
                <button onClick={async () => { const s = getSupabaseOrNull(); if (s) { await (s.from('faq_items') as any).delete().eq('id', q.id as string); qc.invalidateQueries({ queryKey: ['admin', 'faq'] }); }}} className="text-red-500 text-xs mt-1 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete question</button>
              </div>
            ))}
            <button onClick={() => addQuestion(cat.id as string)} className="text-sm text-primary hover:underline mt-2">+ Add Question</button>
          </div>
        ))}
        {categories.length === 0 && <p className="text-slate-500">No FAQ categories. Add one to get started.</p>}
      </div>
    </div>
  );
}
