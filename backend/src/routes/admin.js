import { Router } from 'express';
import Lead from '../models/Lead.js';
import Application from '../models/Application.js';
import mongoose from 'mongoose';
const router=Router();
function requireAdmin(req,res,next){const key=process.env.ADMIN_API_KEY;if(!key)return res.status(503).json({message:'Admin access is not configured. Set ADMIN_API_KEY in the backend environment.'});if(req.get('x-admin-key')!==key)return res.status(401).json({message:'Invalid admin key.'});next()}
router.use(requireAdmin);
router.get('/summary',async(_req,res,next)=>{try{const [total,consultations,healthChecks,leadMagnets,applications]=await Promise.all([Lead.countDocuments(),Lead.countDocuments({type:'consultation'}),Lead.countDocuments({type:'health-checkup'}),Lead.countDocuments({type:'lead-magnet'}),Application.countDocuments()]);res.json({total,consultations,healthChecks,leadMagnets,applications})}catch(e){next(e)}});
router.get('/applications/:id/resume',async(req,res,next)=>{try{if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({message:'Invalid application ID.'});const app=await Application.findById(req.params.id).select('resume');if(!app)return res.status(404).json({message:'Application not found.'});res.setHeader('Content-Type',app.resume.contentType);res.setHeader('Content-Disposition',`attachment; filename=\"${String(app.resume.filename).replace(/[^a-zA-Z0-9._ -]/g,'_')}\"`);return res.send(app.resume.data)}catch(e){next(e)}});
router.get('/leads',async(req,res,next)=>{try{const limit=Math.min(Math.max(Number(req.query.limit)||50,1),100);const [leads,applications]=await Promise.all([Lead.find().select('-__v').sort({createdAt:-1}).limit(limit).lean(),Application.find().select('-resume.data -__v').sort({createdAt:-1}).limit(limit).lean()]);res.json({leads,applications})}catch(e){next(e)}});
export default router;
