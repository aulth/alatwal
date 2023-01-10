import connectToDb from '../../../middleware/connectToDb';
import Location from '../../../models/Location'
import jwt from 'jsonwebtoken'
connectToDb();

const fetchOne = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { url} = req.body;
        if (!url) {
            return res.json({ success: false, msg: "Category url not provided" })
        }
        let location = await Location.findOne({url: url})
        if (location) {
            return res.json({ success: true, msg: 'Location fetched successfully', location:location})
        }else{
            return res.json({success:false, msg:"Something went wrong"})
        }
        
    } catch (error) {
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default fetchOne;