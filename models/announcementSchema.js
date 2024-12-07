import mongoose, { models, Schema } from "mongoose";

const announcementSchema = new Schema({
    headline: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true 
    },
    image: { 
        type: String,
        required: true
    }
}, { timestamps: true })


const Announcement = mongoose.models?.Announcement || mongoose.model("Announcement", announcementSchema)

export default Announcement