import connectToDb from '../../../middleware/connectToDb';
import Package from '../../../models/Package'
import jwt from 'jsonwebtoken'
connectToDb();

const fetchOne = async (req, res) => {
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { url} = req.body;
        if (!url) {
            return res.json({ success: false, msg: "Url not provided" })
        }
        let onePackage = await Package.findOne({url: url})
        if (onePackage) {
            return res.json({ success: true, msg: 'Fetched successfully', package:onePackage})
        }else{
            return res.json({success:false, msg:"Something went wrong"})
        }
        
    } catch (error) {
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default fetchOne;