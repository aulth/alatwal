import mongoose from 'mongoose'
const UserSchema  = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    avatar:String,
    verified:Boolean
},{timestamps:true})

mongoose.models={};
export default mongoose.model('User', UserSchema);