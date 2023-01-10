import mongoose from 'mongoose'
const ContactPage  = new mongoose.Schema({
    title:String,
    overview:String,
    status:String,
},{timestamps:true})

mongoose.models={};
export default mongoose.model('ContactPage', ContactPage);