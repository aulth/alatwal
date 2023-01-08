import mongoose from 'mongoose'
const Location = new mongoose.Schema({
    title: String,
    country: String,
    featured: String,
    status: String,
    images: Array
}, { timestamps: true })

mongoose.models = {};
export default mongoose.model('Location', Location);