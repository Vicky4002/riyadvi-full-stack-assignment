import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Lead from '../models/Lead.js';
import { notifyAdmin } from '../notify.js';
const router = Router();
const leadLimiter = rateLimit({ windowMs: 15*60*1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false, message: { message: 'Too many submissions. Please try again in a little while.' } });
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedTypes = new Set(['contact','consultation','health-checkup','lead-magnet','careers']);
router.post('/', leadLimiter, async (req,res,next)=>{
 try {
  const {name,email,company='',phone='',service='',message,type='contact',source='/',website='',details={}} = req.body ?? {};
  if (typeof website === 'string' && website.trim()) return res.status(201).json({message:'Thank you. Your enquiry has been received.'});
  if (![name,email,message].every(v=>typeof v==='string') || name.trim().length<2 || name.trim().length>100 || !emailPattern.test(email.trim()) || email.length>180 || message.trim().length<10 || message.length>5000) return res.status(400).json({message:'Please provide a valid name, email address and message (at least 10 characters).'});
  const routeTypes = {'/api/contact':'contact','/api/consultation':'consultation','/api/health-checkup':'health-checkup','/api/lead-magnet':'lead-magnet'};
  const inferredType = routeTypes[req.baseUrl] || type;
  const normalizedType = allowedTypes.has(inferredType) ? inferredType : 'contact';
  if (mongooseUnavailable()) return res.status(503).json({message:'Enquiry service is temporarily unavailable. Please try again shortly.'});
  const lead = await Lead.create({name,email,company,phone,service,message,type:normalizedType,source,details});
  void notifyAdmin({subject:`New Riyadvi ${normalizedType} enquiry`,text:`Name: ${name}\nEmail: ${email}\nPhone: ${phone||'Not provided'}\nCompany: ${company||'Not provided'}\nService: ${service||'Not specified'}\nMessage: ${message}\nSource: ${source}`});
  return res.status(201).json({message:'Thank you. Your enquiry has been received.',id:lead._id});
 } catch(error) { if(error.name==='ValidationError') return res.status(400).json({message:'Please check your details and try again.'}); next(error); }
});
function mongooseUnavailable(){return Lead.db.readyState !== 1;}
export default router;
