import mongoose from 'mongoose'
const Package = new mongoose.Schema({
    title: String,
    tourId: String,
    tourTitle: String,
    language: String,
    description: String,
    price: Number,
    discount: Number,
    startingTime: Array,
    withoutTransferAdultRate: Number,
    withoutTransferChildRate: Number,
    sharingTransferAdultRate: Number,
    sharingTransferChildRate: Number,
    privateTransferAdultRate: Number,
    privateTransferChildRate: Number,
    returnSharingBasisTransferAdultRate: Number,
    returnSharingBasisTransferChildRate: Number,
    returnPrivateBasisTransferAdultRate: Number,
    returnPrivateBaisTransferChildRate:Number,
    transferOptionRemark:String
}, { timestamps: true })

mongoose.models = {};
export default mongoose.model('Package', Package);