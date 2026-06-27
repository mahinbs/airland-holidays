import { uploadMedia } from '../../../services/storage';
import { AddButton, DeleteButton, FieldLabel, ReorderButtons, inputClass, moveItem, parseArray } from './shared';

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  image?: string;
  activities?: string[];
};

export default function ItineraryField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: ItineraryDay[]) => void;
}) {
  const items = parseArray<ItineraryDay>(value, []);

  const update = (index: number, patch: Partial<ItineraryDay>) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const upload = async (index: number, file: File) => {
    try {
      const url = await uploadMedia(file, 'itinerary');
      update(index, { image: url });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  return (
    <div>
      <FieldLabel label={label} hint="Drag days to reorder. Each day can include an image and activities." />
      <div className="space-y-4">
        {items.map((day, i) => (
          <div key={i} className="flex gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <ReorderButtons index={i} total={items.length} onMove={(f, t) => onChange(moveItem(items, f, t))} />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500">Day</label>
                <input
                  type="number"
                  className={inputClass}
                  value={day.day ?? i + 1}
                  onChange={(e) => update(i, { day: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Title</label>
                <input className={inputClass} value={day.title ?? ''} onChange={(e) => update(i, { title: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-slate-500">Description</label>
                <textarea
                  rows={3}
                  className={inputClass}
                  value={day.description ?? ''}
                  onChange={(e) => update(i, { description: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-slate-500">Activities (one per line)</label>
                <textarea
                  rows={2}
                  className={inputClass}
                  value={(day.activities ?? []).join('\n')}
                  onChange={(e) => update(i, { activities: e.target.value.split('\n').filter(Boolean) })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-slate-500">Day Image</label>
                <input className={inputClass} value={day.image ?? ''} onChange={(e) => update(i, { image: e.target.value })} placeholder="Image URL" />
                <input type="file" accept="image/*" className="text-xs mt-1" onChange={(e) => e.target.files?.[0] && upload(i, e.target.files[0])} />
                {day.image && <img src={day.image} alt="" className="h-16 rounded-lg object-cover mt-2" />}
              </div>
            </div>
            <DeleteButton onClick={() => onChange(items.filter((_, idx) => idx !== i))} />
          </div>
        ))}
      </div>
      <AddButton
        label="Add day"
        onClick={() => onChange([...items, { day: items.length + 1, title: '', description: '', activities: [] }])}
      />
    </div>
  );
}
