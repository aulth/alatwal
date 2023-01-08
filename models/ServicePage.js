import mongoose from 'mongoose'
const ServicePage  = new mongoose.Schema({
    title:String,
    overview:String,
    status:String,
},{timestamps:true})

mongoose.models={};
export default mongoose.model('ServicePage', ServicePage);