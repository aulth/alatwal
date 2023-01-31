import mongoose, { Mongoose } from 'mongoose'
const Booking = new mongoose.Schema({
    bookingNumber: String,
    firstName:String,
    lastName:String,
    email:String,
    contact:String,
    specialRequest:String,
    pickupLocation:String,
    paymentMethod:String,
    item:Array,
    bookingFor: String,
    price: Number,
    availability: Date,
    paymentStatus: String,
    service:String,
    serviceId:String,
    userId:String,
    sessionId:String,
    date:String,
    image: Array,
    type: String,
    visaDays: String,
}, { timestamps: true })

mongoose.models = {};
export default mongoose.model('Booking', Booking);