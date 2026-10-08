import mongoose from 'mongoose';

const ApplicationSchema=new mongoose.Schema({
  name:{type:String,required:true,trim:true,maxlength:120},
  email:{type:String,required:true,lowercase:true,trim:true},
  phone:{type:String,trim:true,maxlength:40},
  resume:{type:String,trim:true},
  position:{type:String,required:true,trim:true,maxlength:160},
  message:{type:String,trim:true,maxlength:5000},
  status:{type:String,enum:['new','reviewing','shortlisted','rejected'],default:'new'}
},{timestamps:true});

export default mongoose.model('Application',ApplicationSchema);
