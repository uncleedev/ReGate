import mongoose, { Schema } from "mongoose";

const checkoutSessionSchema = new Schema({
    sessionId: { type: String, required: true },
    customerEmail: { type: String, required: true },
    lineItems: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now }
});

const CheckoutSession = mongoose.models.CheckoutSession || mongoose.model("CheckoutSession", checkoutSessionSchema);
export default CheckoutSession;