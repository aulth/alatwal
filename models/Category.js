import mongoose from 'mongoose'
const Category = new mongoose.Schema({
    title: String,
    image:Array,
    status: String,
    url:String,
    type:String,
    description:String
}, { timestamps: true })

mongoose.models = {};
export default mongoose.model('Category', Category);