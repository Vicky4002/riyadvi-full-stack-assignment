import express from 'express';
import Lead from '../models/Lead.js';
import Application from '../models/Application.js';
import { asyncRoute } from '../middleware/validate.js';

const router=express.Router();

function adminGuard(req,res,next){
  const expected=process.env.ADMIN_KEY;
  if(!expected) return next();
  if(req.headers['x-admin-key']!==expected) return res.status(401).json({success:false,error:'Unauthorized'});
  next();
}

router.get('/summary',adminGuard,asyncRoute(async(req,res)=>{
  const [leads,applications]=await Promise.all([
    Lead.find().sort({createdAt:-1}).limit(100).lean(),
    Application.find().sort({createdAt:-1}).limit(100).lean()
  ]);
  res.json({
    success:true,
    totals:{
      enquiries:leads.filter(x=>x.type==='contact').length,
      consultations:leads.filter(x=>x.type==='consultation').length,
      healthCheckups:leads.filter(x=>x.type==='health-checkup').length,
      leadMagnets:leads.filter(x=>x.type==='lead-magnet').length,
      applications:applications.length
    },
    leads,
    applications
  });
}));

export default router;
