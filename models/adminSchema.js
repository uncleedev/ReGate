import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin"
    }
}, { timestamps: true })


const Admin = mongoose.models?.Admin ||  mongoose.model("Admin", adminSchema)

export default Admin