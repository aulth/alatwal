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
        let { type} = req.body;
        if (!type) {
            return res.json({ success: false, msg: "Category not provided" })
        }
       let category = await Category.find({type:type});
       console.log(category)
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