import connectToDb from '../../../middleware/connectToDb';
import Location from '../../../models/Location'
import jwt from 'jsonwebtoken'
connectToDb();

const addLocation = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { title, image, status, featured, country, authtoken } = req.body;
        if (!title || !image || !status || !featured || !country || !authtoken) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let {email} = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if(!email){
            return res.json({success:false, msg:"Invalid token"});
        }
        console.log(req.body)
        let location = await Location.create({
            title: title,
            country: country,
            featured: featured,
            status: status,
            image: image,
            url:title.toLowerCase().split(" ").join("-")
        })
        if (location) {
            return res.json({ success: true, msg: 'Location added successfully' })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }

    } catch (error) {
        return res.json({ success: false, msg: "Something went wrong 2" })
    }
}

export default addLocation;