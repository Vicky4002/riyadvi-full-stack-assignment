export function requireFields(fields){
  return (req,res,next)=>{
    const missing=fields.filter(field=>{
      const value=req.body?.[field];
      return value===undefined || value===null || String(value).trim()==='';
    });
    if(missing.length){
      return res.status(400).json({success:false,error:`Missing required fields: ${missing.join(', ')}`});
    }
    next();
  };
}

export function requireEmail(req,res,next){
  const email=String(req.body?.email||'').trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    return res.status(400).json({success:false,error:'Please provide a valid email address.'});
  }
  next();
}

export function asyncRoute(fn){
  return (req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
}
