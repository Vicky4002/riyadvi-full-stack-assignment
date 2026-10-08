import express from 'express';
import Lead from '../models/Lead.js';
import { requireFields, requireEmail, asyncRoute } from '../middleware/validate.js';

const router=express.Router();

const createLead=(type,fields)=>[
  requireFields(fields),
  requireEmail,
  asyncRoute(async(req,res)=>{
    const lead=await Lead.create({type,...req.body});
    res.status(201).json({success:true,id:lead._id,message:'Submission received successfully.'});
  })
];

router.post('/contact',...createLead('contact',['name','email','message']));
router.post('/consultation',...createLead('consultation',['name','email','message']));
router.post('/health-checkup',...createLead('health-checkup',['name','email','message']));
router.post('/lead-magnet',...createLead('lead-magnet',['name','email']));

export default router;
