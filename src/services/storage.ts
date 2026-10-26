import { getSupabaseOrNull } from '../lib/supabase';

export async function uploadMedia(file: File, folder = 'uploads'): Promise<string> {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  const ext = file.name.split('.').pop() ?? 'bin';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from('media').upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}

const PROOF_BUCKET = 'payment-proofs';
const PROOF_URL_PATTERN = new RegExp(`/storage/v1/object/(?:public|sign|authenticated)/${PROOF_BUCKET}/([^?#]+)`);

/**
 * Uploads a payment screenshot and returns the stored reference.
 * The reference is the object PATH inside the (private) bucket, e.g. `proofs/1730000000-ab12.png`, so it keeps working
 * whether the bucket is public or private. The CMS resolves it to a signed URL when viewing (see resolvePaymentProof).
 */
export async function uploadPaymentProof(file: File): Promise<string> {
  const supabase = getSupabaseOrNull();
  if (!supabase) throw new Error('Supabase not configured');
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `proofs/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(PROOF_BUCKET).upload(path, file, { upsert: false, contentType: file.type || undefined });
  if (error) throw error;
  return path;
}

/** Extracts the bucket object path from a stored reference (new: plain path, legacy: full Supabase storage URL). */
export function paymentProofPath(ref: string | null | undefined): string | null {
  if (!ref) return null;
  const value = ref.trim();
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) {
    const match = value.match(PROOF_URL_PATTERN);
    return match ? decodeURIComponent(match[1]) : null;
  }
  return value.replace(/^\/+/, '').replace(new RegExp(`^${PROOF_BUCKET}/`), '');
}

export type ResolvedProof = {
  /** URL to display inline */
  view: string;
  /** URL that forces a download (Content-Disposition: attachment) when the storage API supports it */
  download: string;
  fileName: string;
};

/** Resolves a stored payment-proof reference into signed (or public fallback) URLs. Signed URLs last 1 hour. */
export async function resolvePaymentProof(ref: string | null | undefined, expiresInSeconds = 3600): Promise<ResolvedProof | null> {
  if (!ref) return null;
  const path = paymentProofPath(ref);
  const fileName = (path ?? ref).split('/').pop()?.split('?')[0] || 'payment-proof';

  // Not one of our storage objects (e.g. an external link) — use as-is.
  if (!path) return { view: ref, download: ref, fileName };

  const supabase = getSupabaseOrNull();
  if (!supabase) return { view: ref, download: ref, fileName };

  const storage = supabase.storage.from(PROOF_BUCKET);
  const [view, download] = await Promise.all([
    storage.createSignedUrl(path, expiresInSeconds),
    storage.createSignedUrl(path, expiresInSeconds, { download: fileName }),
  ]);
  if (view.data?.signedUrl) {
    return { view: view.data.signedUrl, download: download.data?.signedUrl ?? view.data.signedUrl, fileName };
  }

  // Signing failed (bucket public and no select policy, or legacy object) — fall back to the public URL.
  const publicUrl = storage.getPublicUrl(path).data.publicUrl;
  return { view: publicUrl, download: publicUrl, fileName };
}

/** Long-lived (7 day) link used in CSV / Excel exports. */
export async function paymentProofExportLink(ref: string | null | undefined): Promise<string> {
  const resolved = await resolvePaymentProof(ref, 60 * 60 * 24 * 7).catch(() => null);
  return resolved?.view ?? ref ?? '';
}
