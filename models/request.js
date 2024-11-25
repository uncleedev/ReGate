import mongoose, { models, Schema } from "mongoose";

const requestSchema = new Schema({
    receiptNo: {
        type: String,
        required: true,
    },
    studentNo: {
        type: String,
        required: true,
    },
    formType: { 
        type: String,
        enum: ["OVRF", "FORM 137", "Good Moral"],
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["Online", "Cash"],
        required: true
    },
    paymentStatus: {
        type: Boolean,
        required: true
    },
    printStatus: {
        type: String,
        enum: ["Complete", "Pending", "Ongoing"] 
    }
}, { timestamps: true });

const Request = models.Request || mongoose.model("Request", requestSchema);

export default Request;