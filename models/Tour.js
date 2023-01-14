import mongoose from 'mongoose'
const Tour = new mongoose.Schema({
    title: String,
    overview: String,
    highlights: String,
    availability: String,
    description: String,
    category: String,
    categoryTitle: String,
    categoryUrl: String,
    location: String,
    duration: String,
    adultRate: Number,
    childRate: Number,
    infantRate: Number,
    startingTime: String,
    tourLanguage: String,
    transferOption: String,
    importantInformation: String,
    bookingPolicy: String,
    covid19: String,
    tourVideo: String,
    tourAddress: String,
    googleMapLocation: String,
    featuredTour: Boolean,
    paymentMethod: String,
    status: String,
    image: Array,
    url: String,
    adultRatePrime: String,
    childRatePrime: String,
    infantRatePrime: String,
    adultRateNonPrime: String,
    childRateNonPrime: String,
    infantRateNonPrime: String,
    adultRateTicketOnly: String,
    adultRateSharingTransport: String,
    adultRatePrivateTransport: String,
    childRateTicketOnly: String,
    childRateSharingTransport: String,
    childRatePrivateTransport: String,
    infantRateTicketOnly: String,
    infantRateSharingTransport: String,
    infantRatePrivateTransport: String,
    basic:Boolean,
    platinum:Boolean,
    explorer:Boolean,
    pickup:String,
    transport:Number,
    fastTrackAddOn:Number,
}, { timestamps: true })

mongoose.models = {};
export default mongoose.model('Tour', Tour);