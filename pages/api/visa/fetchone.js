import connectToDb from '../../../middleware/connectToDb';
import jwt from 'jsonwebtoken'
import Visa from '../../../models/Visa';
connectToDb();

const fetchOne = async (req, res) => {
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { url} = JSON.parse(req.body);
        console.log(req.body)
        if (!url) {
            return res.json({ success: false, msg: "Url not provided" })
        }
        let visa = await Visa.findOne({url: url})
        if (visa) {
            return res.json({ success: true, msg: 'Fetched successfully', visa:visa})
        }else{
            return res.json({success:false, msg:"Unable to fetch visa"});
        }
        
    } catch (error) {
        return res.json({success:false, msg:error.message})
    }
}

export default fetchOne;