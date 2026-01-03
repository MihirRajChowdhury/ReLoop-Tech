import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    user: {
        type: String, // Simplified for now, just a name
        required: [true, 'Please provide a name'],
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a rating'],
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: [true, 'Please provide a comment'],
        maxlength: 500,
    },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
