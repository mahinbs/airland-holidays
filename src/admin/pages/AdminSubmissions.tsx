import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Download, X, ZoomIn, FileSpreadsheet, FileText } from 'lucide-react';
import { fetchSubmissions, updateSubmissionStatus } from '../../services/submissions';
import type { SubmissionStatus } from '../../types/database';

type Tab = 'contact' | 'payment' | 'package';

// CSV export
function toCsv(rows: Record<string, unknown>[], tab: Tab): string {
  const headers: Record<Tab, string[]> = {
    contact: ['first_name', 'last_name', 'email', 'phone', 'interested_in', 'message', 'status', 'created_at'],
    payment: ['name', 'mobile', 'email', 'amount', 'service', 'payment_type', 'transaction_id', 'notes', 'status', 'created_at'],
    package: ['name', 'email', 'phone', 'package_title', 'package_slug', 'destination', 'travel_date', 'travelers', 'message', 'status', 'created_at'],
  };
  const cols = headers[tab];
  const escape = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = [cols.join(',')];
  for (const row of rows) {
    lines.push(cols.map((c) => escape(row[c])).join(','));
  }
  return lines.join('\n');
}

function downloadCsv(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Simple tab-separated Excel-compatible format (no dependencies needed)
function toTsv(rows: Record<string, unknown>[], tab: Tab): string {
  const headers: Record<Tab, string[]> = {
    contact: ['first_name', 'last_name', 'email', 'phone', 'interested_in', 'message', 'status', 'created_at'],
    payment: ['name', 'mobile', 'email', 'amount', 'service', 'payment_type', 'transaction_id', 'notes', 'status', 'created_at'],
    package: ['name', 'email', 'phone', 'package_title', 'package_slug', 'destination', 'travel_date', 'travelers', 'message', 'status', 'created_at'],
  };
  const cols = headers[tab];
  const clean = (v: unknown) => String(v ?? '').replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
  const lines = [cols.join('\t')];
  for (const row of rows) {
    lines.push(cols.map((c) => clean(row[c])).join('\t'));
  }
  return lines.join('\n');
}

function downloadTsv(content: string, filename: string) {
  const blob = new Blob(['\ufeff' + content], { type: 'text/tab-separated-values;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminSubmissions() {
  const [tab, setTab] = useState<Tab>('contact');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const qc = useQueryClient();
  const { data: rows = [], isLoading } = useQuery({ queryKey: ['admin', 'submissions', tab], queryFn: () => fetchSubmissions(tab) });

  const filtered = rows.filter((row: Record<string, unknown>) => {
    if (!dateFrom && !dateTo) return true;
    const created = new Date(row.created_at as string);
    if (dateFrom && created < new Date(dateFrom)) return false;
    if (dateTo && created > new Date(`${dateTo}T23:59:59`)) return false;
    return true;
  });

  const updateStatus = async (id: string, status: SubmissionStatus) => {
    await updateSubmissionStatus(tab, id, status);
    qc.invalidateQueries({ queryKey: ['admin', 'submissions', tab] });
    qc.invalidateQueries({ queryKey: ['admin', 'submission-counts'] });
  };

  const exportCsv = () => downloadCsv(toCsv(filtered as Record<string, unknown>[], tab), `airland-${tab}-submissions.csv`);
  const exportExcel = () => downloadTsv(toTsv(filtered as Record<string, unknown>[], tab), `airland-${tab}-submissions.xls`);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'contact', label: 'Leads' },
    { id: 'payment', label: 'Payments' },
    { id: 'package', label: 'Package Enquiries' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Submissions Inbox</h1>
        <div className="flex gap-2">
          <button onClick={exportCsv} disabled={filtered.length === 0} className="btn-primary gap-2 disabled:opacity-50 text-sm">
            <FileText className="w-4 h-4" /> CSV
          </button>
          <button onClick={exportExcel} disabled={filtered.length === 0} className="btn-primary gap-2 disabled:opacity-50 text-sm">
            <FileSpreadsheet className="w-4 h-4" /> Excel
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-end">
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === t.id ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto items-center">
          <label className="text-xs text-slate-500">From</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border border-slate-300 rounded-xl px-3 py-2 text-sm" />
          <label className="text-xs text-slate-500">To</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border border-slate-300 rounded-xl px-3 py-2 text-sm" />
          {(dateFrom || dateTo) && <button onClick={() => { setDateFrom(''); setDateTo(''); }} className="text-xs text-slate-400 hover:text-red-500">Clear</button>}
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-4">{filtered.length} submission{filtered.length !== 1 ? 's' : ''}</p>

      {isLoading ? (
        <div className="animate-pulse h-48 bg-white rounded-xl" />
      ) : (
        <div className="space-y-4">
          {filtered.map((row: Record<string, unknown>) => (
            <div key={row.id as string} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {tab === 'contact' && (
                    <>
                      <p className="font-bold text-slate-900">{row.first_name as string} {row.last_name as string}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{row.email as string} · {row.phone as string}</p>
                      {row.interested_in && <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Source: {row.interested_in as string}</span>}
                      <p className="text-sm text-slate-600 mt-2">{row.message as string}</p>
                    </>
                  )}
                  {tab === 'payment' && (
                    <>
                      <p className="font-bold text-slate-900">{row.name as string}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{row.mobile as string} · {row.email as string}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Boolean(row.amount) && <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">₹{String(row.amount)}</span>}
                        {Boolean(row.service) && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{String(row.service)}</span>}
                        {Boolean(row.payment_type) && <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{String(row.payment_type)}</span>}
                      </div>
                      <p className="text-sm text-slate-600 mt-1">Txn: {row.transaction_id as string}</p>
                      {row.notes && <p className="text-sm text-slate-500 mt-1">{row.notes as string}</p>}
                      {row.screenshot_url && (
                        <div className="mt-3 flex gap-3 items-start">
                          <img
                            src={row.screenshot_url as string}
                            alt="Payment proof"
                            className="h-24 rounded-lg border border-slate-200 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setPreviewUrl(row.screenshot_url as string)}
                          />
                          <div className="flex flex-col gap-2">
                            <button onClick={() => setPreviewUrl(row.screenshot_url as string)} className="text-sm text-primary flex items-center gap-1 hover:underline"><ZoomIn className="w-4 h-4" /> Preview</button>
                            <a href={row.screenshot_url as string} download target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 flex items-center gap-1 hover:underline"><Download className="w-4 h-4" /> Download</a>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {tab === 'package' && (
                    <>
                      <p className="font-bold text-slate-900">{row.name as string}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{row.email as string} · {row.phone as string}</p>
                      <div className="mt-2 p-3 bg-primary/5 rounded-xl">
                        <p className="text-sm font-semibold text-primary">{row.package_title as string}</p>
                        {Boolean(row.destination) && <p className="text-xs text-slate-600 mt-0.5">Destination: {String(row.destination)}</p>}
                        {Boolean(row.travel_date) && <p className="text-xs text-slate-600">Travel Date: {String(row.travel_date)} · {String(row.travelers)} travellers</p>}
                      </div>
                      {row.message && <p className="text-sm text-slate-600 mt-2">{row.message as string}</p>}
                    </>
                  )}
                  <p className="text-xs text-slate-400 mt-2">{new Date(row.created_at as string).toLocaleString('en-IN')}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-center ${row.status === 'new' ? 'bg-amber-100 text-amber-700' : row.status === 'read' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                    {row.status as string}
                  </span>
                  {row.status === 'new' && (
                    <button onClick={() => updateStatus(row.id as string, 'read')} className="text-xs text-primary hover:underline">Mark Read</button>
                  )}
                  {row.status !== 'archived' && (
                    <button onClick={() => updateStatus(row.id as string, 'archived')} className="text-xs text-slate-500 hover:underline">Archive</button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-slate-500 text-center py-12">No submissions in this category.</p>}
        </div>
      )}

      {/* Full-screen screenshot preview */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setPreviewUrl(null)}>
          <button className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" onClick={() => setPreviewUrl(null)}>
            <X className="w-6 h-6" />
          </button>
          <img src={previewUrl} alt="Full preview" className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
          <a href={previewUrl} download target="_blank" rel="noopener noreferrer" className="absolute bottom-6 btn-primary gap-2 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <Download className="w-4 h-4" /> Download
          </a>
        </div>
      )}
    </div>
  );
}
