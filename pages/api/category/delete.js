import connectToDb from '../../../middleware/connectToDb';
import Category from '../../../models/Category'
import jwt from 'jsonwebtoken'
connectToDb();

const deleteData = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        console.log(req.body);
        let { url, authtoken} = req.body;
        if (!url || !authtoken) {
            return res.json({ success: false, msg: "All fields required" })
        }
        console.log(JSON.parse(authtoken))
        let {email} = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if(!email){
            return res.json({success:false, msg:"Invalid token"});
        }
        let category = await Category.findOneAndDelete({url:url})
        if (category) {
            console.log(category)
            return res.json({ success: true, msg: 'Deleted successfully'})
        }else{
            return res.json({success:false, msg:"Something went wrong"})
        }
        
    } catch (error) {
        console.log(error)
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default deleteData;