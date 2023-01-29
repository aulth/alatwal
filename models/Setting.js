import mongoose from 'mongoose'
const Setting = new mongoose.Schema({
    footerFbLink: String,
    footerInstagramLink: String,
    footerWhatsappNumber: String,
    footerTripadvisor: String,
    service1Title: String,
    service1Link: String,
    service2Title: String,
    service2Link: String,
    service3Title: String,
    service3Link: String,
    quickContact1: String,
    quickContact2: String,
    companyAddress: String,
    companyEmail: String,
    companyContact: String,
    companyFax: String,
    companyVAT: Number,
    trn: String,
    beneficiary: String,
    bankswift: String,
    bank:String,
    iban: String,
    accountNumber: String,
    menu1Link:String,
    menu1Title:String,
    menu2Link:String,
    menu2Title:String,
    menu3Link:String,
    menu3Title:String,
    menu4Link:String,
    menu4Title:String,

}, { timestamps: true })

mongoose.models = {};
export default mongoose.model('Setting', Setting);