export const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://riyadvi-full-stack-assignment-production.up.railway.app/api' : 'http://localhost:5000/api');
export async function submitLead(payload) {
  const response = await fetch(`${API_BASE}/leads`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
  const data = await response.json().catch(()=>({message:'Unexpected server response'}));
  if (!response.ok) throw new Error(data.message || 'Unable to submit right now. Please try again.');
  return data;
}
export async function fetchCollection(path, fallback=[]) {
  try { const response = await fetch(`${API_BASE}/${path}`); if (!response.ok) return fallback; const data = await response.json(); return data.items || fallback; } catch { return fallback; }
}
