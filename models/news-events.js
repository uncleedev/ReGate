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
        type: String
    },
    image: { 
        type: String,
        required: true
    }
}, { timestamps: true })


const NewsEvent = models.NewsEvent || mongoose.model("NewsEvent", newsEventsSchema)

export default NewsEvent