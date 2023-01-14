import connectToDb from '../../../middleware/connectToDb';
import Tour from '../../../models/Tour'
import Category from '../../../models/Category'
import jwt from 'jsonwebtoken'
connectToDb();

const addTour = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { tourData, authtoken, image } = req.body;
        if (!tourData || !authtoken || !image) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let { email } = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if (!email) {
            return res.json({ success: false, msg: "Invalid token" });
        }
        console.log(tourData)
        let category = await Category.findOne({ _id: tourData.category });
        let tour = await Tour.create({
            title: tourData.title,
            overview: tourData.overview,
            highlights: tourData.highlights,
            availability: tourData.availability,
            description: tourData.description,
            category: tourData.category,
            categoryTitle: category.title,
            categoryUrl: category.title.toLowerCase().split(/\s/).join("-"),
            location: tourData.location,
            status: tourData.status,
            duration: tourData.duration,
            adultRate: tourData.adultRate,
            childRate: tourData.childRate,
            infantRate: tourData.infantRate,
            startingTime: tourData.startingTime,
            tourLanguage: tourData.tourLanguage,
            transferOption: tourData.transferOption,
            importantInformation: tourData.importantInformation,
            bookingPolicy: tourData.bookingPolicy,
            covid19: tourData.covid19,
            tourVideo: tourData.tourVideo,
            tourAddress: tourData.tourAddress,
            googleMapLocation: tourData.googleMapLocation,
            featuredTour: tourData.featuredTour,
            paymentMethod: tourData.paymentMethod,
            image: image,
            url: tourData.title.toLowerCase().split(/\s/).join("-"),
            adultRatePrime: tourData.adultRatePrime,
            childRatePrime: tourData.childRatePrime,
            infantRatePrime: tourData.infantRatePrime,
            adultRateNonPrime: tourData.adultRateNonPrime,
            childRateNonPrime: tourData.childRateNonPrime,
            infantRateNonPrime: tourData.infantRateNonPrime,
            adultRateTicketOnly: tourData.adultRateTicketOnly,
            adultRateSharingTransport: tourData.adultRateSharingTransport,
            adultRatePrivateTransport: tourData.adultRatePrivateTransport,
            childRateTicketOnly: tourData.childRateTicketOnly,
            childRateSharingTransport: tourData.childRateSharingTransport,
            childRatePrivateTransport: tourData.childRatePrivateTransport,
            infantRateTicketOnly: tourData.infantRateTicketOnly,
            infantRateSharingTransport: tourData.infantRateSharingTransport,
            infantRatePrivateTransport: tourData.infantRatePrivateTransport,
            basic: tourData.basic ? true : false,
            platinum: tourData.platinum ? true : false,
            explorer: tourData.explorer ? true : false,
            pickup: tourData.pickup,
            transport: tourData.transport,
            fastTrackAddOn: tourData.fastTrackAddOn,
        })
        if (tour) {
            return res.json({ success: true, msg: 'Tour added successfully' })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }
    } catch (error) {
        return res.json({ success: false, msg: "Something went wrong 2" })
    }
}

export default addTour;