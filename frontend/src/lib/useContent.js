import React from 'react';
import { API_BASE } from './api.js';
const cache = new Map();
async function loadCollection(path){if(!cache.has(path)){cache.set(path,fetch(`${API_BASE}/${path}`).then(r=>{if(!r.ok)throw new Error('Content API unavailable');return r.json()}).then(d=>d.items||[]).catch(()=>[]))}return cache.get(path)}
export function useContent(path,fallback){const [items,setItems]=React.useState(fallback);React.useEffect(()=>{let active=true;loadCollection(path).then(remote=>{if(!active||!remote.length)return;const bySlug=new Map(remote.map(item=>[item.slug,item]));setItems(fallback.map(item=>({...item,...(bySlug.get(item.slug)||{})})).concat(remote.filter(item=>!fallback.some(local=>local.slug===item.slug))))});return()=>{active=false}},[path,fallback]);return items}
