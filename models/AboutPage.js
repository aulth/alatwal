import mongoose from 'mongoose'
const AboutPage  = new mongoose.Schema({
    title:String,
    overview:String,
    status:String,
},{timestamps:true})

mongoose.models={};
export default mongoose.model('AboutPage', AboutPage);