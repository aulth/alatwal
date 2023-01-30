import connectToDb from '../../../middleware/connectToDb';
import jwt from 'jsonwebtoken'
import Visa from '../../../models/Visa';
connectToDb();

const typeFetch = async (req, res) => {
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { url} = req.body;
        if (!url) {
            return res.json({ success: false, msg: "Type not provided" })
        }
        let visa;
        if(url=='all'){
            visa = await Visa.find({});
        } else{
            visa = await Visa.find({typeUrl: url})
        }
        if (visa) {
            return res.json({ success: true, msg: 'Fetched successfully', visa:visa})
        }else{
            return res.json({success:false, msg:"Unable to fetch visa"});
        }
        
    } catch (error) {
        return res.json({success:false, msg:error.message})
    }
}

export default typeFetch;