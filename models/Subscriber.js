import mongoose from 'mongoose'
const Subscriber  = new mongoose.Schema({
    name:String,
    email:String,
    verified:Boolean
},{timestamps:true})

mongoose.models={};
export default mongoose.model('Subscriber', Subscriber);