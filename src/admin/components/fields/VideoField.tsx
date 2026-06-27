import { uploadMedia } from '../../../services/storage';
import { FieldLabel, inputClass } from './shared';

export default function VideoField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: string) => void;
}) {
  const url = typeof value === 'string' ? value : '';

  const upload = async (file: File) => {
    try {
      const uploaded = await uploadMedia(file, 'videos');
      onChange(uploaded);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  return (
    <div>
      <FieldLabel label={label} hint="Paste a video URL or upload a file." />
      <input className={inputClass} value={url} placeholder="https://..." onChange={(e) => onChange(e.target.value)} />
      <input type="file" accept="video/*" className="text-xs mt-2" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
      {url && url.match(/\.(mp4|webm|ogg)/i) && (
        <video src={url} controls className="mt-2 h-32 rounded-lg" />
      )}
    </div>
  );
}
