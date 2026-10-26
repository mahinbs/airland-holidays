import type { FieldConfig } from '../../config/entities';
import StringListField from './StringListField';
import ImageGalleryField from './ImageGalleryField';
import FaqListField from './FaqListField';
import ItineraryField from './ItineraryField';
import RichTextField from './RichTextField';
import TableField from './TableField';
import MediaField from './MediaField';
import VideoField from './VideoField';
import RepeatableField from './RepeatableField';
import PackageSelectField from './PackageSelectField';
import CruiseSelectField from './CruiseSelectField';
import MultiSelectField from './MultiSelectField';
import { uploadMedia } from '../../../services/storage';
import { Toggle, inputClass } from './shared';

export function AdminFieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (field.type === 'string-list') {
    return <StringListField label={field.label} value={value} onChange={onChange} />;
  }
  if (field.type === 'image-gallery') {
    return <ImageGalleryField label={field.label} value={value} onChange={onChange} />;
  }
  if (field.type === 'faq-list') {
    return <FaqListField label={field.label} value={value} onChange={onChange} />;
  }
  if (field.type === 'itinerary') {
    return <ItineraryField label={field.label} value={value} onChange={onChange} />;
  }
  if (field.type === 'richtext') {
    return <RichTextField label={field.label} value={value} onChange={onChange} />;
  }
  if (field.type === 'media') {
    return <MediaField label={field.label} value={value} onChange={onChange} />;
  }
  if (field.type === 'video') {
    return <VideoField label={field.label} value={value} onChange={onChange} />;
  }
  if (field.type === 'package-select') {
    return <PackageSelectField label={field.label} value={value} onChange={onChange} />;
  }
  if (field.type === 'cruise-select') {
    return <CruiseSelectField label={field.label} value={value} onChange={onChange} />;
  }
  if (field.type === 'repeatable' && field.columns) {
    return <RepeatableField label={field.label} value={value} onChange={onChange} columns={field.columns} withEnabled={field.withEnabled} />;
  }
  if (field.type === 'multi-select') {
    return (
      <MultiSelectField
        label={field.label}
        value={value}
        onChange={onChange}
        options={field.options ?? []}
        allowCustom={field.allowCustom}
      />
    );
  }
  if (field.type === 'policy-table') {
    return (
      <TableField
        label={field.label}
        value={value}
        onChange={onChange}
        columns={[
          { key: 'days', label: 'Days / Timeline' },
          { key: 'amount', label: 'Amount / Policy' },
        ]}
      />
    );
  }

  if (field.type === 'textarea' || field.type === 'json') {
    const strVal =
      field.type === 'json'
        ? typeof value === 'string'
          ? value
          : JSON.stringify(
              value ?? (field.name.includes('array') || ['highlights', 'inclusions', 'exclusions', 'images'].includes(field.name) ? [] : {}),
              null,
              2
            )
        : ((value as string) ?? '');
    return (
      <textarea
        rows={field.type === 'json' ? 8 : 4}
        className={`${inputClass} font-mono text-xs`}
        value={strVal}
        onChange={(e) => {
          if (field.type === 'json') {
            try {
              onChange(JSON.parse(e.target.value));
            } catch {
              onChange(e.target.value);
            }
          } else {
            onChange(e.target.value);
          }
        }}
      />
    );
  }

  if (field.type === 'select') {
    return (
      <select className={inputClass} value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)}>
        {field.options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'boolean') {
    return <Toggle checked={Boolean(value)} onChange={onChange} label={value ? 'Yes' : 'No'} />;
  }

  if (field.type === 'number') {
    return (
      <input
        type="number"
        className={inputClass}
        value={(value as number) ?? ''}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }

  if (field.type === 'image') {
    return (
      <div className="space-y-2">
        <input
          type="text"
          className={inputClass}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL"
        />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
              const url = await uploadMedia(file);
              onChange(url);
            } catch (err) {
              alert(err instanceof Error ? err.message : 'Upload failed');
            }
          }}
          className="text-xs"
        />
        {typeof value === 'string' && value && <img src={value} alt="" className="h-20 rounded-lg object-cover" />}
      </div>
    );
  }

  return (
    <input
      type={field.type === 'datetime' ? 'datetime-local' : field.type === 'date' ? 'date' : 'text'}
      className={inputClass}
      value={(value as string) ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
