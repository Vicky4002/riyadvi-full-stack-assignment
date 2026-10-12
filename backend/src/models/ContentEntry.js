import mongoose from 'mongoose';

const contentEntrySchema = new mongoose.Schema({
  collection: { type: String, enum: ['services', 'cases', 'posts', 'jobs'], required: true, index: true },
  slug: { type: String, required: true, trim: true, lowercase: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  published: { type: Boolean, default: true }
}, { timestamps: true });

contentEntrySchema.index({ collection: 1, slug: 1 }, { unique: true });
export default mongoose.model('ContentEntry', contentEntrySchema);
