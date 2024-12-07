import mongoose, { models, Schema } from "mongoose";

const newsEventsSchema = new Schema({
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


const NewsEvent = mongoose.models?.NewsEvent || mongoose.model("NewsEvent", newsEventsSchema)

export default NewsEvent