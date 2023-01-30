import mongoose from 'mongoose'
const Visa = new mongoose.Schema({
    title: String,
    type: String,
    typeUrl: String,
    url: String,
    description: String,
    overview: String,
    highlights: String,
    bookingPolicy: String,
    importantInformation: String,
    price:Number,
    workingDays: String,
    price30Days: Number,
    price60Days: Number,
    status: {
        type:String,
        default: 'active',
    },
    image: Array
}, { timestamps: true })

mongoose.models = {};
export default mongoose.model('Visa', Visa);