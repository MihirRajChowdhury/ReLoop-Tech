import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: { type: Number, default: 1 },
        priceAtPurchase: Number,
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['processing', 'harvesting', 'shipped', 'delivered', 'cancelled'],
        default: 'processing',
    },
    trackingNumber: {
        type: String,
    },
    trackingSteps: [{
        title: String,
        date: Date,
        completed: Boolean,
    }],
    shippingAddress: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
