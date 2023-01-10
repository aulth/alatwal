import connectToDb from '../../../middleware/connectToDb';
import Category from '../../../models/Category'
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
        let category = await Category.findOne({url: url})
        if (category) {
            return res.json({ success: true, msg: 'Category fetched successfully', category:category})
        }else{
            return res.json({success:false, msg:"Something went wrong"})
        }
        
    } catch (error) {
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default fetchOne;