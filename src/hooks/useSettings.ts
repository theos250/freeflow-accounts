import { useState, useEffect } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface Settings {
  id: string;
  workspace_name: string;
  workspace_logo?: string;
  currency: string;
  timezone: string;
  invoice_prefix: string;
  invoice_number_format: string;
  notify_invoices: boolean;
  notify_payments: boolean;
  notify_expenses: boolean;
  updated_at?: string;
}

export function useSettings(supabase: SupabaseClient, userId: string) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("settings")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (fetchError) {
          if (fetchError.code === "PGRST116") {
            // No settings found, this is ok
            setSettings(null);
          } else {
            setError(fetchError.message);
          }
        } else {
          setSettings(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadSettings();
    }
  }, [userId, supabase]);

  const updateSettings = async (updates: Partial<Settings>) => {
    try {
      setSaving(true);
      setError(null);

      const { error: updateError } = await supabase
        .from("settings")
        .upsert(
          {
            ...settings,
            ...updates,
            user_id: userId,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        )
        .select()
        .single();

      if (updateError) {
        setError(updateError.message);
      } else {
        setSettings((prev) => (prev ? { ...prev, ...updates } : null));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  return {
    settings,
    loading,
    saving,
    error,
    updateSettings,
  };
}
