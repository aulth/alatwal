import mongoose from 'mongoose'
const Visa = new mongoose.Schema({
    title: String,
    type: String,
    price: String,
    workingDays: String,
    overview: String,
    status: String,
    image: Array
}, { timestamps: true })

mongoose.models = {};
export default mongoose.model('Visa', Visa);