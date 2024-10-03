import mongoose from 'mongoose';

const savedProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const SavedProduct = mongoose.models.SavedProduct || mongoose.model('SavedProduct', savedProductSchema);

export default SavedProduct;
