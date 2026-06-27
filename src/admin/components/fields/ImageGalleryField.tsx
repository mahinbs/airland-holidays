import { uploadMedia } from '../../../services/storage';
import { AddButton, DeleteButton, FieldLabel, ReorderButtons, inputClass, moveItem, parseArray } from './shared';

export default function ImageGalleryField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: string[]) => void;
}) {
  const items = parseArray<string>(value, []);

  const update = (index: number, url: string) => {
    const next = [...items];
    next[index] = url;
    onChange(next);
  };

  const upload = async (index: number, file: File) => {
    try {
      const url = await uploadMedia(file, 'gallery');
      update(index, url);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  return (
    <div>
      <FieldLabel label={label} hint="Drag to reorder with arrows. Upload or paste image URLs." />
      <div className="space-y-3">
        {items.map((url, i) => (
          <div key={i} className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <ReorderButtons index={i} total={items.length} onMove={(f, t) => onChange(moveItem(items, f, t))} />
            <div className="flex-1 space-y-2">
              <input className={inputClass} value={url} placeholder="Image URL" onChange={(e) => update(i, e.target.value)} />
              <input type="file" accept="image/*" className="text-xs" onChange={(e) => e.target.files?.[0] && upload(i, e.target.files[0])} />
              {url && <img src={url} alt="" className="h-20 rounded-lg object-cover" />}
            </div>
            <DeleteButton onClick={() => onChange(items.filter((_, idx) => idx !== i))} />
          </div>
        ))}
      </div>
      <AddButton label="Add image" onClick={() => onChange([...items, ''])} />
    </div>
  );
}
