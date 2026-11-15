import { supabaseConfig } from "./supabase-config.js";
const tokenKey = "wle-staging-auth-session";
export function readSession() { try { return JSON.parse(sessionStorage.getItem(tokenKey) || "null"); } catch { return null; } }
export function clearSession() { sessionStorage.removeItem(tokenKey); }
export async function signIn(email, password) {
  const response = await fetch(`${supabaseConfig.url}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: supabaseConfig.publishableKey, "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error_description || body.msg || "Sign-in failed");
  sessionStorage.setItem(tokenKey, JSON.stringify(body)); return body;
}
export async function readScope(session) {
  const response = await fetch(`${supabaseConfig.url}/rest/v1/wle_staging_appointments?organization_id=eq.org_syn_northbank&project_id=eq.project_syn_northbank&contract_id=eq.contract_syn_nb042&select=organization_id,project_id,contract_id,appointment_scope,appointment_status`, { headers: { apikey: supabaseConfig.publishableKey, Authorization: `Bearer ${session.access_token}` } });
  if (!response.ok) throw new Error(`scope-${response.status}`); return response.json();
}
export async function readScopedRows(session) {
  if (!session?.access_token) throw new Error("signed-out");
  const response = await fetch(`${supabaseConfig.url}/rest/v1/wle_staging_read_model?organization_id=eq.org_syn_northbank&project_id=eq.project_syn_northbank&contract_id=eq.contract_syn_nb042&select=record_type,organization_id,project_id,contract_id,source_system,source_record_id,source_revision,source_digest,payload&order=record_type`, { headers: { apikey: supabaseConfig.publishableKey, Authorization: `Bearer ${session.access_token}` } });
  if (!response.ok) throw new Error(`read-${response.status}`); return response.json();
}
