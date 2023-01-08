import mongoose from 'mongoose'
const Booking = new mongoose.Schema({
    bookingNumber: String,
    bookingFor: String,
    price: Number,
    availability: Date,
    paymentStatus: String,
    service:String,
    serviceId:String
}, { timestamps: true })

mongoose.models = {};
export default mongoose.model('Booking', Booking);