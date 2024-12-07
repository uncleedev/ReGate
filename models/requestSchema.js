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
    email: {
        type: String,
        required: true
    },
    formType: { 
        type: String,
        enum: ["Sample1", "Sample2", "Sample3"],
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
        enum: ["Complete", "Pending", "Ongoing"],
        default: "Pending" 
    }
}, { timestamps: true });

const Request = mongoose.models?.Request || mongoose.model("Request", requestSchema);

export default Request;