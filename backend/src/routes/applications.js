import express from 'express';
import Application from '../models/Application.js';
import { requireFields, requireEmail, asyncRoute } from '../middleware/validate.js';

const router=express.Router();

router.post('/',
  requireFields(['name','email','position']),
  requireEmail,
  asyncRoute(async(req,res)=>{
    const application=await Application.create({
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      resume:req.body.resume,
      position:req.body.position,
      message:req.body.message
    });
    res.status(201).json({success:true,id:application._id,message:'Application received successfully.'});
  })
);

export default router;
