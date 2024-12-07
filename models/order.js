import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema({
    email: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;