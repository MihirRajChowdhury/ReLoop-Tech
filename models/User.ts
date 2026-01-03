import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this user.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email for this user.'],
        unique: true,
    },
    password: {
        type: String,
        select: false, // Don't return password by default
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['buyer', 'seller', 'recycler', 'admin'],
        default: 'buyer',
    },
    carbonSaved: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
