import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Download, X, ZoomIn, ZoomOut, Maximize2, FileSpreadsheet, FileText, Search, ImageOff, Loader2, ExternalLink } from 'lucide-react';
import { fetchSubmissions, updateSubmissionStatus } from '../../services/submissions';
import { paymentProofExportLink, resolvePaymentProof } from '../../services/storage';
import { downloadCsv, downloadXlsx, type ExportColumn, type ExportSheet } from '../../lib/exportData';
import { useAuth } from '../../contexts/AuthContext';
import type { SubmissionStatus } from '../../types/database';

type Tab = 'contact' | 'payment' | 'package';
type Row = Record<string, unknown>;

const TAB_LABEL: Record<Tab, string> = { contact: 'Leads', package: 'Package Enquiries', payment: 'Payments' };
const SHEET_NAME: Record<Tab, string> = { contact: 'Leads', package: 'Package Enquiries', payment: 'Payment Submissions' };
const FILE_PREFIX: Record<Tab, string> = { contact: 'leads', package: 'package-enquiries', payment: 'payment-submissions' };

const str = (v: unknown) => (v === null || v === undefined ? '' : String(v));
const fullDate = (v: unknown) => (v ? new Date(String(v)).toLocaleString('en-IN') : '');

const COLUMNS: Record<Tab, ExportColumn<Row>[]> = {
  contact: [
    { key: 'name', label: 'Name', width: 24, value: (r) => `${str(r.first_name)} ${str(r.last_name)}`.trim() },
    { key: 'phone', label: 'Mobile', width: 16 },
    { key: 'email', label: 'Email', width: 28 },
    { key: 'interested_in', label: 'Source', width: 22 },
    { key: 'message', label: 'Message', width: 48 },
    { key: 'status', label: 'Status', width: 12 },
    { key: 'created_at', label: 'Date', width: 22, value: (r) => fullDate(r.created_at) },
    { key: 'id', label: 'Submission ID', width: 38 },
  ],
  package: [
    { key: 'package_title', label: 'Package Name', width: 32 },
    { key: 'package_slug', label: 'Package Slug', width: 26 },
    { key: 'destination', label: 'Destination', width: 20 },
    { key: 'travel_date', label: 'Travel Date', width: 16 },
    { key: 'travelers', label: 'Travellers', width: 12 },
    { key: 'message', label: 'Notes', width: 48 },
    { key: 'name', label: 'Name', width: 24 },
    { key: 'phone', label: 'Mobile', width: 16 },
    { key: 'email', label: 'Email', width: 28 },
    { key: 'status', label: 'Status', width: 12 },
    { key: 'created_at', label: 'Date', width: 22, value: (r) => fullDate(r.created_at) },
    { key: 'id', label: 'Submission ID', width: 38 },
  ],
  payment: [
    { key: 'name', label: 'Name', width: 24 },
    { key: 'mobile', label: 'Mobile', width: 16 },
    { key: 'email', label: 'Email', width: 28 },
    { key: 'amount', label: 'Amount (INR)', width: 14 },
    { key: 'payment_type', label: 'Payment Type', width: 16 },
    { key: 'service', label: 'Service', width: 22 },
    { key: 'transaction_id', label: 'Transaction ID', width: 24 },
    { key: 'notes', label: 'Notes', width: 40 },
    { key: 'screenshot_link', label: 'Screenshot Link (valid 7 days)', width: 60 },
    { key: 'status', label: 'Status', width: 12 },
    { key: 'created_at', label: 'Date', width: 22, value: (r) => fullDate(r.created_at) },
    { key: 'id', label: 'Submission ID', width: 38 },
  ],
};

const SEARCH_KEYS: Record<Tab, string[]> = {
  contact: ['first_name', 'last_name', 'email', 'phone', 'interested_in', 'message'],
  package: ['name', 'email', 'phone', 'package_title', 'package_slug', 'destination', 'message'],
  payment: ['name', 'mobile', 'email', 'amount', 'service', 'payment_type', 'transaction_id', 'notes'],
};

function proofKey(ref: unknown) {
  return ['admin', 'payment-proof', str(ref)];
}

function useProof(ref: unknown) {
  return useQuery({
    queryKey: proofKey(ref),
    queryFn: () => resolvePaymentProof(str(ref)),
    enabled: Boolean(ref),
    staleTime: 50 * 60 * 1000,
    retry: 1,
  });
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  if (children === null || children === undefined || children === '') return null;
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">{label}</p>
      <p className="text-sm text-slate-800 break-words">{children}</p>
    </div>
  );
}

function ProofThumb({ reference, onOpen }: { reference: string; onOpen: () => void }) {
  const { data, isLoading, isError, refetch } = useProof(reference);
  const [broken, setBroken] = useState(false);

  if (isLoading) {
    return (
      <div className="h-28 w-28 rounded-lg border border-slate-200 flex items-center justify-center bg-slate-50">
        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
      </div>
    );
  }
  if (isError || !data || broken) {
    return (
      <div className="h-28 w-40 rounded-lg border border-red-200 bg-red-50 text-red-700 flex flex-col items-center justify-center gap-1 p-2 text-center">
        <ImageOff className="w-5 h-5" />
        <p className="text-[11px] leading-tight">Screenshot could not be loaded</p>
        <button
          type="button"
          className="text-[11px] underline"
          onClick={() => {
            setBroken(false);
            void refetch();
          }}
        >
          Retry
        </button>
      </div>
    );
  }
  return (
    <button type="button" onClick={onOpen} className="group relative block" title="Click to enlarge">
      <img
        src={data.view}
        alt="Payment proof"
        className="h-28 max-w-[10rem] rounded-lg border border-slate-200 object-cover group-hover:opacity-90 transition-opacity"
        onError={() => setBroken(true)}
      />
      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-lg">
        <ZoomIn className="w-5 h-5 text-white" />
      </span>
    </button>
  );
}

function ProofModal({ reference, onClose }: { reference: string; onClose: () => void }) {
  const { data, isLoading, isError } = useProof(reference);
  const [zoomed, setZoomed] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !document.fullscreenElement && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const toggleFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  const btn = 'inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-full transition-colors';

  return (
    <div ref={wrapRef} className="fixed inset-0 z-50 bg-black/90 flex flex-col" onClick={onClose}>
      <div className="flex items-center justify-between gap-2 p-3" onClick={(e) => e.stopPropagation()}>
        <p className="text-white/70 text-sm truncate">{data?.fileName ?? 'Payment screenshot'}</p>
        <div className="flex items-center gap-2">
          <button type="button" className={btn} onClick={() => setZoomed((z) => !z)}>
            {zoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />} {zoomed ? 'Fit to screen' : 'Zoom'}
          </button>
          <button type="button" className={btn} onClick={toggleFullscreen}>
            <Maximize2 className="w-4 h-4" /> Full screen
          </button>
          {data && (
            <a href={data.download} download={data.fileName} target="_blank" rel="noopener noreferrer" className={btn}>
              <Download className="w-4 h-4" /> Download
            </a>
          )}
          {data && (
            <a href={data.view} target="_blank" rel="noopener noreferrer" className={btn}>
              <ExternalLink className="w-4 h-4" /> Open
            </a>
          )}
          <button type="button" className={btn} onClick={onClose} aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto flex p-4" onClick={onClose}>
        {isLoading && <Loader2 className="w-8 h-8 animate-spin text-white m-auto" />}
        {(isError || (!isLoading && !data)) && <p className="text-white m-auto">This screenshot could not be loaded.</p>}
        {data && (
          <img
            src={data.view}
            alt="Payment proof"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed((z) => !z);
            }}
            className={`m-auto rounded-lg shadow-2xl ${zoomed ? 'max-w-none cursor-zoom-out' : 'max-w-full max-h-full object-contain cursor-zoom-in'}`}
          />
        )}
      </div>
    </div>
  );
}

export default function AdminSubmissions() {
  const { can } = useAuth();
  const canLeads = can('view_leads');
  const canPayments = can('manage_payments');
  const canExport = can('export_data');
  const available = useMemo<Tab[]>(() => {
    const tabs: Tab[] = [];
    if (canLeads) tabs.push('contact', 'package');
    if (canPayments) tabs.push('payment');
    return tabs;
  }, [canLeads, canPayments]);

  const [tab, setTab] = useState<Tab>(available[0] ?? 'contact');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | SubmissionStatus>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [proofRef, setProofRef] = useState<string | null>(null);
  const [exporting, setExporting] = useState<string | null>(null);
  const qc = useQueryClient();

  const queries = {
    contact: useQuery({ queryKey: ['admin', 'submissions', 'contact'], queryFn: () => fetchSubmissions('contact'), enabled: canLeads }),
    package: useQuery({ queryKey: ['admin', 'submissions', 'package'], queryFn: () => fetchSubmissions('package'), enabled: canLeads }),
    payment: useQuery({ queryKey: ['admin', 'submissions', 'payment'], queryFn: () => fetchSubmissions('payment'), enabled: canPayments }),
  };

  const activeTab: Tab = available.includes(tab) ? tab : (available[0] ?? 'contact');
  const rows = (queries[activeTab].data ?? []) as Row[];
  const isLoading = queries[activeTab].isLoading;

  const applyFilters = (source: Row[], which: Tab): Row[] => {
    const term = search.trim().toLowerCase();
    return source.filter((row) => {
      if (statusFilter !== 'all' && row.status !== statusFilter) return false;
      const created = new Date(String(row.created_at));
      if (dateFrom && created < new Date(dateFrom)) return false;
      if (dateTo && created > new Date(`${dateTo}T23:59:59`)) return false;
      if (!term) return true;
      return SEARCH_KEYS[which].some((k) => str(row[k]).toLowerCase().includes(term));
    });
  };

  const filtered = useMemo(
    () => applyFilters(rows, activeTab),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rows, activeTab, search, statusFilter, dateFrom, dateTo]
  );

  const updateStatus = async (id: string, status: SubmissionStatus) => {
    await updateSubmissionStatus(activeTab, id, status);
    qc.invalidateQueries({ queryKey: ['admin', 'submissions', activeTab] });
    qc.invalidateQueries({ queryKey: ['admin', 'submission-counts'] });
  };

  /** Adds a long-lived screenshot link to payment rows before exporting. */
  const withProofLinks = async (source: Row[]): Promise<Row[]> =>
    Promise.all(source.map(async (r) => ({ ...r, screenshot_link: r.screenshot_url ? await paymentProofExportLink(str(r.screenshot_url)) : '' })));

  const sheetFor = async (which: Tab): Promise<ExportSheet<Row>> => {
    const source = applyFilters((queries[which].data ?? []) as Row[], which);
    return { name: SHEET_NAME[which], columns: COLUMNS[which], rows: which === 'payment' ? await withProofLinks(source) : source };
  };

  const stamp = () => new Date().toISOString().slice(0, 10);

  const runExport = async (kind: 'csv' | 'xlsx' | 'all') => {
    setExporting(kind);
    try {
      if (kind === 'all') {
        const sheets = await Promise.all(available.map(sheetFor));
        downloadXlsx(sheets, `airland-all-submissions-${stamp()}.xlsx`);
      } else {
        const sheet = await sheetFor(activeTab);
        const base = `airland-${FILE_PREFIX[activeTab]}-${stamp()}`;
        if (kind === 'csv') downloadCsv(sheet.columns, sheet.rows, `${base}.csv`);
        else downloadXlsx([sheet], `${base}.xlsx`);
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Export failed');
    }
    setExporting(null);
  };

  if (available.length === 0) {
    return <p className="text-slate-500">You do not have access to any submissions.</p>;
  }

  const countFor = (t: Tab) => {
    const data = (queries[t].data ?? []) as Row[];
    return { total: data.length, fresh: data.filter((r) => r.status === 'new').length };
  };

  const exportBtn = 'btn-primary gap-2 disabled:opacity-50 text-sm';

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Submissions Inbox</h1>
          <p className="text-sm text-slate-500 mt-1">Leads, package enquiries and payment proofs. Exports respect the search, status and date filters below.</p>
        </div>
        {canExport ? (
          <div className="flex flex-wrap gap-2">
            <button onClick={() => void runExport('csv')} disabled={filtered.length === 0 || exporting !== null} className={exportBtn}>
              {exporting === 'csv' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />} CSV
            </button>
            <button onClick={() => void runExport('xlsx')} disabled={filtered.length === 0 || exporting !== null} className={exportBtn}>
              {exporting === 'xlsx' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />} Excel (.xlsx)
            </button>
            <button onClick={() => void runExport('all')} disabled={exporting !== null} className={exportBtn} title="One workbook with a sheet per tab">
              {exporting === 'all' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />} Export all tabs
            </button>
          </div>
        ) : (
          <p className="text-xs text-slate-400">Exports require the “Can Export Data” permission.</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mb-4 items-end">
        <div className="flex gap-2 flex-wrap">
          {available.map((t) => {
            const c = countFor(t);
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === t ? 'bg-primary text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                {TAB_LABEL[t]}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === t ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>{c.total}</span>
                {c.fresh > 0 && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-900">{c.fresh} new</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-end">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className="w-full border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            placeholder="Search name, email, phone, transaction…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | SubmissionStatus)}
          className="border border-slate-300 rounded-xl px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="archived">Archived</option>
        </select>
        <div className="flex gap-2 ml-auto items-center">
          <label className="text-xs text-slate-500">From</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border border-slate-300 rounded-xl px-3 py-2 text-sm" />
          <label className="text-xs text-slate-500">To</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border border-slate-300 rounded-xl px-3 py-2 text-sm" />
          {(dateFrom || dateTo || search || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setDateFrom('');
                setDateTo('');
                setSearch('');
                setStatusFilter('all');
              }}
              className="text-xs text-slate-400 hover:text-red-500"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-4">
        {filtered.length} of {rows.length} submission{rows.length !== 1 ? 's' : ''}
      </p>

      {isLoading ? (
        <div className="animate-pulse h-48 bg-white rounded-xl" />
      ) : (
        <div className="space-y-4">
          {filtered.map((row) => (
            <div key={str(row.id)} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {activeTab === 'contact' && (
                    <>
                      <p className="font-bold text-slate-900 mb-3">
                        {str(row.first_name)} {str(row.last_name)}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Detail label="Mobile">{str(row.phone)}</Detail>
                        <Detail label="Email">{str(row.email)}</Detail>
                        <Detail label="Source">{str(row.interested_in)}</Detail>
                        <Detail label="Date">{fullDate(row.created_at)}</Detail>
                      </div>
                      {Boolean(row.message) && <p className="text-sm text-slate-600 mt-3 bg-slate-50 rounded-lg p-3 whitespace-pre-wrap">{str(row.message)}</p>}
                    </>
                  )}

                  {activeTab === 'package' && (
                    <>
                      <p className="font-bold text-slate-900 mb-3">{str(row.package_title) || 'Package enquiry'}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Detail label="Destination">{str(row.destination)}</Detail>
                        <Detail label="Travel Date">{str(row.travel_date)}</Detail>
                        <Detail label="Travellers">{str(row.travelers)}</Detail>
                        <Detail label="Date">{fullDate(row.created_at)}</Detail>
                        <Detail label="Name">{str(row.name)}</Detail>
                        <Detail label="Mobile">{str(row.phone)}</Detail>
                        <Detail label="Email">{str(row.email)}</Detail>
                        <Detail label="Package Slug">{str(row.package_slug)}</Detail>
                      </div>
                      {Boolean(row.message) && (
                        <div className="mt-3 bg-slate-50 rounded-lg p-3">
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Notes</p>
                          <p className="text-sm text-slate-600 whitespace-pre-wrap">{str(row.message)}</p>
                        </div>
                      )}
                    </>
                  )}

                  {activeTab === 'payment' && (
                    <>
                      <p className="font-bold text-slate-900 mb-3">{str(row.name)}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Detail label="Amount">{row.amount ? `₹${str(row.amount)}` : ''}</Detail>
                        <Detail label="Payment Type">{str(row.payment_type)}</Detail>
                        <Detail label="Transaction ID">{str(row.transaction_id)}</Detail>
                        <Detail label="Service">{str(row.service)}</Detail>
                        <Detail label="Mobile">{str(row.mobile)}</Detail>
                        <Detail label="Email">{str(row.email)}</Detail>
                        <Detail label="Date">{fullDate(row.created_at)}</Detail>
                      </div>
                      {Boolean(row.notes) && <p className="text-sm text-slate-600 mt-3 bg-slate-50 rounded-lg p-3 whitespace-pre-wrap">{str(row.notes)}</p>}
                      {Boolean(row.screenshot_url) && (
                        <div className="mt-4 flex flex-wrap gap-4 items-start">
                          <ProofThumb reference={str(row.screenshot_url)} onOpen={() => setProofRef(str(row.screenshot_url))} />
                          <ProofActions reference={str(row.screenshot_url)} onOpen={() => setProofRef(str(row.screenshot_url))} />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-2 shrink-0 items-end">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium text-center ${
                      row.status === 'new' ? 'bg-amber-100 text-amber-700' : row.status === 'read' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {str(row.status)}
                  </span>
                  {row.status === 'new' && (
                    <button onClick={() => void updateStatus(str(row.id), 'read')} className="text-xs text-primary hover:underline">
                      Mark Read
                    </button>
                  )}
                  {row.status !== 'archived' && (
                    <button onClick={() => void updateStatus(str(row.id), 'archived')} className="text-xs text-slate-500 hover:underline">
                      Archive
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-slate-500 text-center py-12">No submissions match.</p>}
        </div>
      )}

      {proofRef && <ProofModal reference={proofRef} onClose={() => setProofRef(null)} />}
    </div>
  );
}

function ProofActions({ reference, onOpen }: { reference: string; onOpen: () => void }) {
  const { data } = useProof(reference);
  return (
    <div className="flex flex-col gap-2 pt-1">
      <button onClick={onOpen} className="text-sm text-primary flex items-center gap-1 hover:underline">
        <ZoomIn className="w-4 h-4" /> Large preview / zoom
      </button>
      {data && (
        <a href={data.download} download={data.fileName} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 flex items-center gap-1 hover:underline">
          <Download className="w-4 h-4" /> Download
        </a>
      )}
      <button onClick={onOpen} className="text-sm text-slate-600 flex items-center gap-1 hover:underline">
        <Maximize2 className="w-4 h-4" /> Full-screen view
      </button>
    </div>
  );
}
