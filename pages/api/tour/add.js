import connectToDb from '../../../middleware/connectToDb';
import Tour from '../../../models/Tour'
import jwt from 'jsonwebtoken'
connectToDb();

const addTour = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { title,
            overview,
            highlights,
            availability,
            description,
            category,
            duration,
            adultRate,
            childRate,
            infantRate,
            startingTime,
            tourLanguage,
            transferOption,
            importantInformation,
            bookingPolicy,
            covid19,
            tourVideo,
            tourAddress,
            googleMapLocation,
            featuredTour,
            paymentMethod,
            image } = req.body;
        if (!title || !overview || !highlights || !availability || !description || !duration || !adultRate || !childRate || !infantRate || !startingTime || !tourLanguage || !transferOption || !importantInformation || !bookingPolicy || !covid19 || !tourVideo || !googleMapLocation || !tourAddress || !featuredTour || !paymentMethod || !image ) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let verifyAuthtoken = jwt.verify(authtoken, JWTSECRET);
        if (!verifyAuthtoken) {
            return res.json({ success: false, msg: "Invalid token" });
        }
        let tour = await Tour.create({
            title: title,
            overview: overview,
            highlights: highlights,
            availability: availability,
            description: description,
            category: category,
            duration: durationa,
            adultRate: adultRate,
            childRate: childRate,
            infantRate: infantRate,
            startingTime: startingTime,
            tourLanguage: tourLanguage,
            transferOption: transferOption,
            importantInformation: importantInformation,
            bookingPolicy: bookingPolicy,
            covid19: covid19,
            tourVideo: tourVideo,
            tourAddress: tourAddress,
            googleMapLocation: googleMapLocation,
            featuredTour: featuredTour,
            paymentMethod: paymentMethod,
            image: image
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