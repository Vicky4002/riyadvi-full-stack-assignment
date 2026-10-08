import mongoose from 'mongoose';

const LeadSchema=new mongoose.Schema({
  type:{type:String,required:true,index:true},
  name:{type:String,required:true,trim:true,maxlength:120},
  email:{type:String,required:true,lowercase:true,trim:true},
  phone:{type:String,trim:true,maxlength:40},
  company:{type:String,trim:true,maxlength:160},
  requirement:{type:String,trim:true,maxlength:1000},
  message:{type:String,trim:true,maxlength:5000},
  data:{type:mongoose.Schema.Types.Mixed}
},{timestamps:true});

export default mongoose.model('Lead',LeadSchema);
