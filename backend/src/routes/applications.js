import { Router } from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import Application from '../models/Application.js';
import { notifyAdmin } from '../notify.js';
const router=Router();
const applicationLimiter=rateLimit({windowMs:15*60*1000,limit:5,standardHeaders:'draft-7',legacyHeaders:false,message:{message:'Too many applications. Please try again later.'}});
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:5*1024*1024,files:1},fileFilter(_req,file,cb){const allowed=['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];if(allowed.includes(file.mimetype))return cb(null,true);cb(new Error('Resume must be a PDF, DOC or DOCX file.'));}});
router.post('/',applicationLimiter,(req,res,next)=>upload.single('resume')(req,res,async error=>{
 if(error)return res.status(error.code==='LIMIT_FILE_SIZE'?413:400).json({message:error.message||'Resume upload failed.'});
 try{
  const {name,email,phone,position,message=''}=req.body||{};
  if(!name||name.trim().length<2||!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!phone||!position||!req.file)return res.status(400).json({message:'Name, valid email, phone, position and a resume file are required.'});
  if(Application.db.readyState!==1)return res.status(503).json({message:'Application service is temporarily unavailable. Please try again shortly.'});
  const application=await Application.create({name,email,phone,position,message,resume:{filename:req.file.originalname,contentType:req.file.mimetype,size:req.file.size,data:req.file.buffer}});
  void notifyAdmin({subject:'New Riyadvi career application',text:`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPosition: ${position}\nResume: ${req.file.originalname}`});
  return res.status(201).json({message:'Application received. Thank you for your interest.',id:application._id});
 }catch(err){next(err)}
}));
export default router;
