import * as mongoose from 'mongoose';

export const SellerSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
   phoneNumber: { type: String, required: true },
   address1: { type: String },
   address2: { type: String },
   zipCode: { type: String, required: true },
   city: { type: String, required: true },
   state: { type: String, required: true },
   country: { type: String, required: true },
   status: {
      type: String,
      default: 'InActive',
      possibleValues: ['Active', 'InActive', 'Suspended'],
   },
});
