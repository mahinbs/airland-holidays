import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { fetchSiteSetting, upsertSiteSetting } from '../../services/content';
import { defaultPaymentPageConfig } from '../../data/defaultCmsContent';
import type { PaymentPageConfig } from '../../types/cms';
import StringListField from '../components/fields/StringListField';
import TableField from '../components/fields/TableField';
import { inputClass, Toggle } from '../components/fields/shared';
import { uploadMedia } from '../../services/storage';

export default function AdminPayment() {
  const qc = useQueryClient();
  const [config, setConfig] = useState<PaymentPageConfig>(defaultPaymentPageConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSiteSetting<PaymentPageConfig>('payment_config').then((data) => {
      if (data) {
        setConfig({
          ...defaultPaymentPageConfig,
          ...data,
          bankTransfer: { ...defaultPaymentPageConfig.bankTransfer, ...data.bankTransfer },
          upi: { ...defaultPaymentPageConfig.upi, ...data.upi },
          razorpay: { ...defaultPaymentPageConfig.razorpay, ...data.razorpay },
          shortHaulPolicy: { ...defaultPaymentPageConfig.shortHaulPolicy, ...data.shortHaulPolicy },
          longHaulPolicy: { ...defaultPaymentPageConfig.longHaulPolicy, ...data.longHaulPolicy },
          formFields: { ...defaultPaymentPageConfig.formFields, ...data.formFields },
        });
      }
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await upsertSiteSetting('payment_config', config);
      await qc.invalidateQueries({ queryKey: ['site_setting', 'payment_config'] });
      setMessage('Payment settings saved successfully.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to save');
    }
    setSaving(false);
  };

  const patch = <K extends keyof PaymentPageConfig>(key: K, value: PaymentPageConfig[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  if (loading) return <div className="animate-pulse h-64 bg-white rounded-xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payment Page</h1>
          <p className="text-slate-500 text-sm mt-1">Manage bank details, UPI, Razorpay links, policies and form settings.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary gap-2 disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {message && <div className="mb-4 px-4 py-3 rounded-xl text-sm bg-emerald-50 text-emerald-800 border border-emerald-200">{message}</div>}

      <div className="space-y-6">
        <Section title="Page Header">
          <Field label="Page Title">
            <input className={inputClass} value={config.pageTitle} onChange={(e) => patch('pageTitle', e.target.value)} />
          </Field>
          <Field label="Page Description">
            <input className={inputClass} value={config.pageDescription} onChange={(e) => patch('pageDescription', e.target.value)} />
          </Field>
        </Section>

        <Section title="Bank Transfer">
          <Field label="Account Number">
            <input className={inputClass} value={config.bankTransfer.accountNumber} onChange={(e) => patch('bankTransfer', { ...config.bankTransfer, accountNumber: e.target.value })} />
          </Field>
          <Field label="Account Name">
            <input className={inputClass} value={config.bankTransfer.accountName} onChange={(e) => patch('bankTransfer', { ...config.bankTransfer, accountName: e.target.value })} />
          </Field>
          <Field label="IFSC Code">
            <input className={inputClass} value={config.bankTransfer.ifscCode} onChange={(e) => patch('bankTransfer', { ...config.bankTransfer, ifscCode: e.target.value })} />
          </Field>
          <Field label="Bank Name (optional)">
            <input className={inputClass} value={config.bankTransfer.bankName ?? ''} onChange={(e) => patch('bankTransfer', { ...config.bankTransfer, bankName: e.target.value })} />
          </Field>
          <Field label="Branch (optional)">
            <input className={inputClass} value={config.bankTransfer.branch ?? ''} onChange={(e) => patch('bankTransfer', { ...config.bankTransfer, branch: e.target.value })} />
          </Field>
        </Section>

        <Section title="UPI Payment">
          <Field label="UPI ID">
            <input className={inputClass} value={config.upi.id} onChange={(e) => patch('upi', { ...config.upi, id: e.target.value })} />
          </Field>
          <Field label="Account Name">
            <input className={inputClass} value={config.upi.name} onChange={(e) => patch('upi', { ...config.upi, name: e.target.value })} />
          </Field>
          <Field label="QR Code">
            <input className={inputClass} value={config.upi.qrImage} onChange={(e) => patch('upi', { ...config.upi, qrImage: e.target.value })} />
            <input type="file" accept="image/*" className="text-xs mt-2" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const url = await uploadMedia(file, 'payment');
                patch('upi', { ...config.upi, qrImage: url });
              } catch (err) {
                setMessage(err instanceof Error ? err.message : 'QR upload failed');
              }
            }} />
            {config.upi.qrImage && <img src={config.upi.qrImage} alt="QR" className="h-32 mt-2 rounded-lg" />}
          </Field>
          <Field label="Note">
            <textarea className={inputClass} rows={2} value={config.upi.note} onChange={(e) => patch('upi', { ...config.upi, note: e.target.value })} />
          </Field>
        </Section>

        <Section title="Razorpay">
          <Field label="Payment Link">
            <input className={inputClass} value={config.razorpay.link} onChange={(e) => patch('razorpay', { ...config.razorpay, link: e.target.value })} />
          </Field>
          <Field label="Note">
            <textarea className={inputClass} rows={2} value={config.razorpay.note} onChange={(e) => patch('razorpay', { ...config.razorpay, note: e.target.value })} />
          </Field>
        </Section>

        <Section title="Services Dropdown">
          <StringListField label="Payment Services" value={config.services} onChange={(v) => patch('services', v)} placeholder="e.g. Visa Processing" />
        </Section>

        <Section title="Important Notes">
          <StringListField label="Notes" value={config.importantNotes} onChange={(v) => patch('importantNotes', v)} />
        </Section>

        <Section title="Short Haul Policy">
          <Field label="Label"><input className={inputClass} value={config.shortHaulPolicy.label} onChange={(e) => patch('shortHaulPolicy', { ...config.shortHaulPolicy, label: e.target.value })} /></Field>
          <Field label="Description"><textarea className={inputClass} rows={2} value={config.shortHaulPolicy.description} onChange={(e) => patch('shortHaulPolicy', { ...config.shortHaulPolicy, description: e.target.value })} /></Field>
          <TableField label="Policy Table" value={config.shortHaulPolicy.rows} onChange={(v) => patch('shortHaulPolicy', { ...config.shortHaulPolicy, rows: v as { days: string; amount: string }[] })} columns={[{ key: 'days', label: 'Timeline' }, { key: 'amount', label: 'Policy' }]} />
          <StringListField label="Policy Notes" value={config.shortHaulPolicy.notes} onChange={(v) => patch('shortHaulPolicy', { ...config.shortHaulPolicy, notes: v })} />
        </Section>

        <Section title="Long Haul Policy">
          <Field label="Label"><input className={inputClass} value={config.longHaulPolicy.label} onChange={(e) => patch('longHaulPolicy', { ...config.longHaulPolicy, label: e.target.value })} /></Field>
          <Field label="Description"><textarea className={inputClass} rows={2} value={config.longHaulPolicy.description} onChange={(e) => patch('longHaulPolicy', { ...config.longHaulPolicy, description: e.target.value })} /></Field>
          <TableField label="Policy Table" value={config.longHaulPolicy.rows} onChange={(v) => patch('longHaulPolicy', { ...config.longHaulPolicy, rows: v as { days: string; amount: string }[] })} columns={[{ key: 'days', label: 'Timeline' }, { key: 'amount', label: 'Policy' }]} />
          <StringListField label="Policy Notes" value={config.longHaulPolicy.notes} onChange={(v) => patch('longHaulPolicy', { ...config.longHaulPolicy, notes: v })} />
        </Section>

        <Section title="Payment Form Settings">
          <Field label="Allowed File Types (comma separated, e.g. jpg, png, pdf)">
            <input className={inputClass} value={config.formFields.allowedFileTypes} onChange={(e) => patch('formFields', { ...config.formFields, allowedFileTypes: e.target.value })} />
          </Field>
          <Field label="Max Upload Size (MB)">
            <input type="number" min={1} max={50} className={inputClass} value={config.formFields.maxUploadSizeMb} onChange={(e) => patch('formFields', { ...config.formFields, maxUploadSizeMb: Number(e.target.value) })} />
          </Field>
          <Field label="Submit Button Label">
            <input className={inputClass} value={config.formFields.submitLabel ?? ''} onChange={(e) => patch('formFields', { ...config.formFields, submitLabel: e.target.value })} />
          </Field>
          <Field label="Screenshot Upload">
            <Toggle checked={Boolean(config.formFields.requireScreenshot)} onChange={(v) => patch('formFields', { ...config.formFields, requireScreenshot: v })} label={config.formFields.requireScreenshot ? 'Required' : 'Optional'} />
          </Field>
          <Field label="Success Title">
            <input className={inputClass} value={config.formFields.successTitle ?? ''} onChange={(e) => patch('formFields', { ...config.formFields, successTitle: e.target.value })} />
          </Field>
          <Field label="Success Message">
            <textarea className={inputClass} rows={2} value={config.formFields.successMessage ?? ''} onChange={(e) => patch('formFields', { ...config.formFields, successMessage: e.target.value })} />
          </Field>
          <div className="md:col-span-2">
            <StringListField label="Payment Type Options (shown in the form dropdown)" value={config.formFields.paymentTypes ?? []} onChange={(v) => patch('formFields', { ...config.formFields, paymentTypes: v })} placeholder="e.g. Bank Transfer" />
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h2 className="font-bold text-slate-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-1">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
