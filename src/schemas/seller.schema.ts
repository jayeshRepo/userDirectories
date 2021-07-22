import * as mongoose from 'mongoose';

export const SellerSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    address1: { type: String },
    address2: { type: String },
    zipCode: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true },
    country: { type: String, require: true },
    status: {
        type: String,
        default: 'InActive',
        possibleValues: ['Active','InActive','Suspended']
    }
})