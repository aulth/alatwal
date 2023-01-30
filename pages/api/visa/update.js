import connectToDb from '../../../middleware/connectToDb';
import Visa from '../../../models/Visa'
import jwt from 'jsonwebtoken'
connectToDb();

const update = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { data, authtoken, image } = req.body;
        if (!data) {
            return res.json({ success: false, msg: "All fields required" })
        }
        if(image.length<1){
            return res.json({ success: false, msg: "Please upload image" })
        }
        if (!authtoken) {
            return res.json({ success: false, msg: "Authtoken not provided" })
        }
        
        let { email } = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if (!email) {
            return res.json({ success: false, msg: "Invalid token" });
        }
        let newVisa = await Visa.findOneAndUpdate({url:data.url}, {
            title: data.title,
            type: data.type,
            typeUrl : data.type=='UAE Visa'?'uae-visa':'international-visa',
            url: data.title.toLowerCase().split(/\s/).join("-"),
            description: data.description,
            overview: data.overview,
            highlights: data.highlights,
            bookingPolicy: data.bookingPolicy,
            importantInformation: data.importantInformation,
            image: image,
            status:data.status,
            price: data.price?data.price:null,
            workingDays: data.workingDays,
            price30Days: data.price30Days?data.price30Days:null,
            price60Days: data.price60Days?data.price60Days:null,
        });
        if (newVisa) {
            return res.json({ success: true, msg: 'Updated successfully' })
        } else {
            return res.json({ success: false, msg: "Update failed" })
        }
    } catch (error) {
        return res.json({ success: false, msg: error.message })
    }
}

export default update;