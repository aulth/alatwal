import mongoose from 'mongoose'
const FaqPage  = new mongoose.Schema({
    title:String,
    overview:String,
    status:String,
},{timestamps:true})

mongoose.models={};
export default mongoose.model('FaqPage', FaqPage);