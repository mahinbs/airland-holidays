import { getSupabaseOrNull } from '../lib/supabase';
import type {
  ContactSubmissionRow,
  PackageEnquiryRow,
  PaymentSubmissionRow,
  SubmissionStatus,
} from '../types/database';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function submissionsTable(supabase: NonNullable<ReturnType<typeof getSupabaseOrNull>>, name: string) {
  return supabase.from(name) as any;
}

export async function submitContact(data: Omit<ContactSubmissionRow, 'id' | 'status' | 'admin_notes' | 'created_at'>) {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await submissionsTable(supabase, 'contact_submissions').insert(data);
  if (error) throw error;
}

export async function submitPayment(data: Omit<PaymentSubmissionRow, 'id' | 'status' | 'admin_notes' | 'created_at'>) {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await submissionsTable(supabase, 'payment_submissions').insert(data);
  if (error) throw error;
}

export async function submitPackageEnquiry(
  data: Omit<PackageEnquiryRow, 'id' | 'status' | 'admin_notes' | 'created_at'>
) {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await submissionsTable(supabase, 'package_enquiries').insert(data);
  if (error) throw error;
}

export async function fetchSubmissions(type: 'contact' | 'payment' | 'package') {
  const supabase = getSupabaseOrNull();
  if (!supabase) return [];
  const tableName =
    type === 'contact' ? 'contact_submissions' : type === 'payment' ? 'payment_submissions' : 'package_enquiries';
  const { data, error } = await submissionsTable(supabase, tableName).select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function updateSubmissionStatus(
  type: 'contact' | 'payment' | 'package',
  id: string,
  status: SubmissionStatus,
  adminNotes?: string
) {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  const tableName =
    type === 'contact' ? 'contact_submissions' : type === 'payment' ? 'payment_submissions' : 'package_enquiries';
  const payload: Record<string, unknown> = { status };
  if (adminNotes !== undefined) payload.admin_notes = adminNotes;
  const { error } = await submissionsTable(supabase, tableName).update(payload).eq('id', id);
  if (error) throw error;
}

export async function fetchSubmissionCounts() {
  const supabase = getSupabaseOrNull();
  if (!supabase) return { contact: 0, payment: 0, package: 0 };
  const [c, p, e] = await Promise.all([
    submissionsTable(supabase, 'contact_submissions').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    submissionsTable(supabase, 'payment_submissions').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    submissionsTable(supabase, 'package_enquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
  ]);
  return {
    contact: c.count ?? 0,
    payment: p.count ?? 0,
    package: e.count ?? 0,
  };
}
