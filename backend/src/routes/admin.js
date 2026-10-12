import { Router } from 'express';
import Lead from '../models/Lead.js';
import Application from '../models/Application.js';
import ContentEntry from '../models/ContentEntry.js';
import mongoose from 'mongoose';

const router = Router();
const allowedCollections = new Set(['services', 'cases', 'posts', 'jobs']);
function requireAdmin(req, res, next) {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return res.status(503).json({ message: 'Admin access is not configured. Set ADMIN_API_KEY in the backend environment.' });
  if (req.get('x-admin-key') !== key) return res.status(401).json({ message: 'Invalid admin key.' });
  next();
}
router.use(requireAdmin);

router.get('/summary', async (_req, res, next) => {
  try {
    const [total, consultations, healthChecks, leadMagnets, applications, contentEntries] = await Promise.all([
      Lead.countDocuments(), Lead.countDocuments({ type: 'consultation' }), Lead.countDocuments({ type: 'health-checkup' }),
      Lead.countDocuments({ type: 'lead-magnet' }), Application.countDocuments(), ContentEntry.countDocuments()
    ]);
    res.json({ total, consultations, healthChecks, leadMagnets, applications, contentEntries });
  } catch (e) { next(e); }
});

router.get('/content', async (_req, res, next) => {
  try {
    const entries = await ContentEntry.find().sort({ collection: 1, slug: 1 }).lean();
    res.json({ items: entries, count: entries.length });
  } catch (e) { next(e); }
});

router.post('/content/:collection', async (req, res, next) => {
  try {
    const { collection } = req.params;
    const { slug, data, published = true } = req.body || {};
    if (!allowedCollections.has(collection)) return res.status(400).json({ message: 'Unsupported content collection.' });
    if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !data || typeof data !== 'object' || Array.isArray(data) || data.slug !== slug) {
      return res.status(400).json({ message: 'Provide a valid slug and a content object whose slug matches it.' });
    }
    const entry = await ContentEntry.findOneAndUpdate({ collection, slug }, { $set: { data, published: Boolean(published) } }, { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true });
    return res.status(201).json({ item: entry });
  } catch (e) { if (e.code === 11000) return res.status(409).json({ message: 'A content item with that slug already exists.' }); next(e); }
});

router.delete('/content/:collection/:slug', async (req, res, next) => {
  try {
    if (!allowedCollections.has(req.params.collection)) return res.status(400).json({ message: 'Unsupported content collection.' });
    const result = await ContentEntry.findOneAndDelete({ collection: req.params.collection, slug: req.params.slug });
    if (!result) return res.status(404).json({ message: 'Content override not found.' });
    return res.json({ message: 'Content override deleted. The built-in fallback is now active.' });
  } catch (e) { next(e); }
});

router.get('/applications/:id/resume', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid application ID.' });
    const app = await Application.findById(req.params.id).select('resume');
    if (!app) return res.status(404).json({ message: 'Application not found.' });
    res.setHeader('Content-Type', app.resume.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${String(app.resume.filename).replace(/[^a-zA-Z0-9._ -]/g, '_')}"`);
    return res.send(app.resume.data);
  } catch (e) { next(e); }
});

router.get('/leads', async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 100);
    const [leads, applications] = await Promise.all([
      Lead.find().select('-__v').sort({ createdAt: -1 }).limit(limit).lean(),
      Application.find().select('-resume.data -__v').sort({ createdAt: -1 }).limit(limit).lean()
    ]);
    res.json({ leads, applications });
  } catch (e) { next(e); }
});
export default router;
