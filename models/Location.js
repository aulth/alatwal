import mongoose from 'mongoose'
const Location = new mongoose.Schema({
    title: String,
    country: String,
    featured: String,
    status: String,
    image: Array,
    url:String
}, { timestamps: true })

mongoose.models = {};
export default mongoose.model('Location', Location);