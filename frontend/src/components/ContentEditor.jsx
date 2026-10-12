import React, { useCallback, useEffect, useState } from 'react';
import { ArrowDownToLine, Database, FileJson, Plus, Save, Trash2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://riyadvi-full-stack-assignment-production.up.railway.app/api' : 'http://localhost:5000/api');
const collections = ['services', 'cases', 'posts', 'jobs'];

export default function ContentEditor({ adminKey }) {
  const [items, setItems] = useState([]);
  const [collection, setCollection] = useState('services');
  const [slug, setSlug] = useState('');
  const [json, setJson] = useState('');
  const [published, setPublished] = useState(true);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const request = useCallback(async (path, options = {}) => {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey, ...(options.headers || {}) }
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || 'Content request failed.');
    return result;
  }, [adminKey]);

  const refresh = useCallback(async () => {
    if (!adminKey) return;
    try {
      const result = await request('/admin/content');
      setItems(result.items || []);
    } catch (error) { setMessage(error.message); }
  }, [adminKey, request]);

  useEffect(() => { refresh(); }, [refresh]);

  function startNew() {
    setSlug('');
    setJson(JSON.stringify({ slug: '', name: '', short: '', detail: '' }, null, 2));
    setPublished(true);
    setMessage('New content override. Choose a collection, then fill in the JSON fields.');
  }

  function selectItem(item) {
    setCollection(item.collection);
    setSlug(item.slug);
    setJson(JSON.stringify(item.data, null, 2));
    setPublished(item.published);
    setMessage(`Editing ${item.collection}/${item.slug}`);
  }

  async function save(event) {
    event.preventDefault();
    setBusy(true); setMessage('');
    try {
      const data = JSON.parse(json);
      if (!slug.trim()) throw new Error('Enter a slug.');
      data.slug = slug.trim();
      await request(`/admin/content/${collection}`, { method: 'POST', body: JSON.stringify({ slug: data.slug, data, published }) });
      await refresh();
      setMessage('Saved to MongoDB. The public content API will now serve this version.');
    } catch (error) { setMessage(error instanceof SyntaxError ? 'JSON is invalid. Check commas, quotes and brackets.' : error.message); }
    finally { setBusy(false); }
  }

  async function remove() {
    if (!slug || !window.confirm(`Delete the ${collection}/${slug} override? The built-in fallback will be used.`)) return;
    setBusy(true); setMessage('');
    try {
      await request(`/admin/content/${collection}/${slug}`, { method: 'DELETE' });
      await refresh(); startNew(); setMessage('Override deleted. Built-in fallback content is active again.');
    } catch (error) { setMessage(error.message); }
    finally { setBusy(false); }
  }

  return <section className="content-editor-panel">
    <div className="content-editor-heading"><div><span className="content-editor-icon"><Database size={18}/></span><div><span className="eyebrow">DYNAMIC CONTENT</span><h2>Content studio</h2><p>Publish and manage service, case study, insight and career content stored in MongoDB.</p></div></div><button type="button" className="button button-quiet" onClick={refresh}><ArrowDownToLine size={15}/> Refresh</button></div>
    <div className="content-editor-layout">
      <aside className="content-editor-list"><div className="content-editor-list-head"><b>Saved overrides</b><button type="button" onClick={startNew} aria-label="New content"><Plus size={15}/> New</button></div>{items.length===0?<p className="content-editor-empty">No overrides saved yet. The public site uses its built-in content until you publish an override.</p>:items.map(item=><button type="button" className={item.slug===slug&&item.collection===collection?'content-entry active':'content-entry'} key={item._id} onClick={()=>selectItem(item)}><span>{item.collection}</span><b>{item.slug}</b><small>{item.published?'Published':'Draft'}</small></button>)}</aside>
      <form className="content-editor-form" onSubmit={save}>
        <div className="content-editor-fields"><label>Collection<select value={collection} onChange={e=>setCollection(e.target.value)}>{collections.map(name=><option key={name} value={name}>{name}</option>)}</select></label><label>Slug<input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="e.g. web-development" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required/></label></div>
        <label className="content-json-label"><span><FileJson size={15}/> Content data (JSON)</span><textarea value={json} onChange={e=>setJson(e.target.value)} rows={14} spellCheck={false} required/></label>
        <label className="content-published"><input type="checkbox" checked={published} onChange={e=>setPublished(e.target.checked)}/> Visible on the public website</label>
        <div className="content-editor-actions"><button className="button button-gold" type="submit" disabled={busy}><Save size={15}/>{busy?'Saving…':'Save to MongoDB'}</button><button className="button button-quiet" type="button" onClick={remove} disabled={busy||!slug}><Trash2 size={15}/> Delete override</button></div>
        {message&&<p className="content-editor-message" role="status">{message}</p>}
      </form>
    </div>
  </section>;
}
