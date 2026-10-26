import { useState } from 'react';
import { uploadMedia } from '../../../services/storage';
import { AddButton, DeleteButton, FieldLabel, ReorderButtons, inputClass, moveItem, parseArray, useSortable } from './shared';

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
  const sortable = useSortable(items, onChange);
  const [uploading, setUploading] = useState(false);

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

  const uploadMany = async (files: FileList) => {
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadMedia(file, 'gallery'));
      }
      onChange([...items.filter(Boolean), ...urls]);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
    setUploading(false);
  };

  return (
    <div>
      <FieldLabel label={label} hint="Drag to reorder. Upload several images at once or paste image URLs." />
      <div className="space-y-3">
        {items.map((url, i) => (
          <div key={i} {...sortable.rowProps(i)} className={`flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 transition-opacity ${sortable.rowClass(i)}`}>
            <ReorderButtons index={i} total={items.length} onMove={(f, t) => onChange(moveItem(items, f, t))} handleProps={sortable.handleProps(i)} />
            <div className="flex-1 space-y-2">
              <input className={inputClass} value={url} placeholder="Image URL" onChange={(e) => update(i, e.target.value)} />
              <input type="file" accept="image/*" className="text-xs" onChange={(e) => e.target.files?.[0] && upload(i, e.target.files[0])} />
              {url && <img src={url} alt="" className="h-20 rounded-lg object-cover" />}
            </div>
            <DeleteButton onClick={() => onChange(items.filter((_, idx) => idx !== i))} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <AddButton label="Add image" onClick={() => onChange([...items, ''])} />
        <label className="flex items-center gap-1.5 text-sm text-primary hover:underline mt-2 cursor-pointer">
          {uploading ? 'Uploading…' : 'Upload multiple images'}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              if (e.target.files?.length) void uploadMany(e.target.files);
              e.target.value = '';
            }}
          />
        </label>
      </div>
    </div>
  );
}
