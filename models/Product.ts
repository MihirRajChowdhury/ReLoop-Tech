import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this product.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description.'],
        maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price.'],
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category.'],
        enum: ['Laptops', 'Phones', 'Components', 'Audio', 'Gaming', 'Other'],
    },
    condition: {
        type: String,
        required: [true, 'Please provide the condition.'],
        enum: ['Mint', 'Good', 'Fair', 'Salvage'],
    },
    images: {
        type: [String],
        default: [],
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true, // Optional for now to easy seeding
    },
    carbonSaved: {
        type: Number,
        default: 0,
        min: 0,
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'pending'],
        default: 'available',
    }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
