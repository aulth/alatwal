import connectToDb from '../../../middleware/connectToDb';
import Category from '../../../models/Category'
connectToDb();

const fetchCategory = async (req, res) => {
    try {
        if (req.method != 'GET') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let category = await Category.find({});
        if (category) {
            return res.json({ success: true, msg: 'Category Fetched', category:category})
        }else{
            return res.json({success:false, msg:"No Category Found"})
        }
    } catch (error) {
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default fetchCategory;