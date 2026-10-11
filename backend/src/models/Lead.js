import mongoose from 'mongoose';
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
  company: { type: String, trim: true, maxlength: 140, default: '' },
  phone: { type: String, trim: true, maxlength: 40, default: '' },
  service: { type: String, trim: true, maxlength: 120, default: '' },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 5000 },
  type: { type: String, enum: ['contact','consultation','health-checkup','lead-magnet','careers'], default: 'contact' },
  source: { type: String, trim: true, maxlength: 200, default: '/' },
  details: { type: mongoose.Schema.Types.Mixed, default: {} },
  status: { type: String, enum: ['new','contacted','qualified','closed'], default: 'new' }
}, { timestamps: true });
leadSchema.index({ createdAt: -1 });
export default mongoose.model('Lead', leadSchema);
