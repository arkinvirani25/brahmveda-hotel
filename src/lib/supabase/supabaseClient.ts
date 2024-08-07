import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseStorageUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!;

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{global: {
      headers: {
        'X-Client-Info': `storage-url=${supabaseStorageUrl}`
      }
    }}
  );
}
