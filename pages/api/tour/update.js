import connectToDb from '../../../middleware/connectToDb';
import Tour from '../../../models/Tour'
import Category from '../../../models/Category'
import jwt from 'jsonwebtoken'
connectToDb();

const update = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let {title, overview, highlights, availability, status, description, category, duration, adultRate, childRate, infantRate, startingTime, tourLanguage, transferOption, importantInformation, bookingPolicy, covid19, tourVideo, tourAddress, googleMapLocation, featuredTour, paymentMethod,authtoken, id, image, location} = req.body;
        let {email} = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if(!email){
            return res.json({success:false, msg:"Invalid token"});
        }
        let categoryData = await Category.findOne({_id:category});
        let tour = await Tour.findOneAndUpdate({_id:id}, {
            title:title,
            overview:overview,
            highlights:highlights,
            availability:availability,
            description:description,
            category:category,
            categoryTitle:categoryData.title,
            location:location,
            status:status,
            duration:duration,
            adultRate:adultRate,
            childRate:childRate,
            infantRate:infantRate,
            startingTime:startingTime,
            tourLanguage:tourLanguage,
            transferOption:transferOption,
            importantInformation:importantInformation,
            bookingPolicy:bookingPolicy,
            covid19:covid19,
            tourVideo:tourVideo,
            tourAddress:tourAddress,
            googleMapLocation:googleMapLocation,
            featuredTour:featuredTour,
            paymentMethod:paymentMethod,
            image: image,
            url:title.toLowerCase().split(/\s/).join("-")
        })
        if (tour) {
            return res.json({ success: true, msg: 'Updted successfully'})
        }else{
            return res.json({success:false, msg:"Something went wrong"})
        }
        
    } catch (error) {
        console.log(error)
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default update;