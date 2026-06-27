import { uploadMedia } from '../../../services/storage';
import { FieldLabel, inputClass } from './shared';

type MediaValue = { type: 'image' | 'video'; src: string; poster?: string; hoverSrc?: string };

function parseMedia(value: unknown): MediaValue {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const v = value as MediaValue;
    return { type: v.type ?? 'image', src: v.src ?? '', poster: v.poster, hoverSrc: v.hoverSrc };
  }
  return { type: 'image', src: '' };
}

export default function MediaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: MediaValue) => void;
}) {
  const media = parseMedia(value);

  const upload = async (field: 'src' | 'poster' | 'hoverSrc', file: File) => {
    try {
      const url = await uploadMedia(file, 'media');
      onChange({ ...media, [field]: url });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  return (
    <div className="space-y-3">
      <FieldLabel label={label} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-slate-500">Media Type</label>
          <select
            className={inputClass}
            value={media.type}
            onChange={(e) => onChange({ ...media, type: e.target.value as 'image' | 'video' })}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-500">{media.type === 'video' ? 'Video URL' : 'Image URL'}</label>
          <input className={inputClass} value={media.src} onChange={(e) => onChange({ ...media, src: e.target.value })} />
          <input type="file" accept={media.type === 'video' ? 'video/*' : 'image/*'} className="text-xs mt-1" onChange={(e) => e.target.files?.[0] && upload('src', e.target.files[0])} />
        </div>
        {media.type === 'video' && (
          <div>
            <label className="text-xs text-slate-500">Poster Image</label>
            <input className={inputClass} value={media.poster ?? ''} onChange={(e) => onChange({ ...media, poster: e.target.value })} />
            <input type="file" accept="image/*" className="text-xs mt-1" onChange={(e) => e.target.files?.[0] && upload('poster', e.target.files[0])} />
          </div>
        )}
        {media.type === 'image' && (
          <div>
            <label className="text-xs text-slate-500">Hover Image (optional)</label>
            <input className={inputClass} value={media.hoverSrc ?? ''} onChange={(e) => onChange({ ...media, hoverSrc: e.target.value })} />
            <input type="file" accept="image/*" className="text-xs mt-1" onChange={(e) => e.target.files?.[0] && upload('hoverSrc', e.target.files[0])} />
          </div>
        )}
      </div>
      {media.src && media.type === 'image' && <img src={media.src} alt="" className="h-24 rounded-lg object-cover" />}
    </div>
  );
}
