import mongoose from 'mongoose';
const applicationSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true,minlength:2,maxlength:100},
  email:{type:String,required:true,trim:true,lowercase:true,maxlength:180},
  phone:{type:String,required:true,trim:true,maxlength:40},
  company:{type:String,trim:true,maxlength:140,default:''},
  position:{type:String,required:true,trim:true,maxlength:140},
  message:{type:String,trim:true,maxlength:3000,default:''},
  resume:{filename:{type:String,required:true},contentType:{type:String,required:true},size:{type:Number,required:true},data:{type:Buffer,required:true}},
  status:{type:String,enum:['new','reviewing','shortlisted','closed'],default:'new'}
},{timestamps:true});
applicationSchema.index({createdAt:-1});
export default mongoose.model('Application',applicationSchema);
