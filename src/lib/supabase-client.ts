/**
 * If your project already has a Supabase client (e.g. `src/lib/supabase.ts`
 * or `src/lib/supabase/client.ts`), DELETE this file and update the imports
 * in services/team/*.ts to point at your existing client instead.
 */
import { createBrowserClient } from '@supabase/ssr';

export function getSupabaseBrowserClient() {
  return createBrowserClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  );
}

export const supabase = getSupabaseBrowserClient();
