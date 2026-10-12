import { Router } from 'express';
import { services, cases, posts, jobs } from '../content.js';
import ContentEntry from '../models/ContentEntry.js';
import mongoose from 'mongoose';

const router = Router();
const defaults = { services, cases, posts, jobs };
const allowed = new Set(Object.keys(defaults));
const expose = (items) => ({ items, count: items.length });

async function getCollection(name) {
  const fallback = defaults[name] || [];
  if (mongoose.connection.readyState !== 1) return fallback;
  const records = await ContentEntry.find({ collection: name, published: true }).sort({ createdAt: 1 }).lean();
  if (!records.length) return fallback;
  const overrides = new Map(records.map(record => [record.slug, record.data]));
  const merged = fallback.map(item => ({ ...item, ...(overrides.get(item.slug) || {}) }));
  const known = new Set(fallback.map(item => item.slug));
  for (const record of records) if (!known.has(record.slug)) merged.push(record.data);
  return merged;
}

router.get('/:collection', async (req, res, next) => {
  try {
    if (!allowed.has(req.params.collection)) return res.status(404).json({ message: 'Content collection not found.' });
    const items = await getCollection(req.params.collection);
    const safeItems = req.params.collection === 'posts' ? items.map(({ body, ...item }) => item) : items;
    return res.json(expose(safeItems));
  } catch (error) { next(error); }
});

router.get('/:collection/:slug', async (req, res, next) => {
  try {
    if (!allowed.has(req.params.collection)) return res.status(404).json({ message: 'Content collection not found.' });
    const items = await getCollection(req.params.collection);
    const item = items.find(entry => entry.slug === req.params.slug);
    if (!item) return res.status(404).json({ message: 'Content item not found.' });
    const safeItem = req.params.collection === 'posts' ? (({ body, ...rest }) => rest)(item) : item;
    return res.json({ item: safeItem });
  } catch (error) { next(error); }
});

export default router;
