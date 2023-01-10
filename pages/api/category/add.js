import connectToDb from '../../../middleware/connectToDb';
import Category from '../../../models/Category'
import jwt, { verify } from 'jsonwebtoken'
connectToDb();

const addCategory = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        console.log(req.body);
        let { title, image, status, authtoken} = req.body;
        if (!title || !image || !status || !authtoken) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let {email} = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if(!email){
            return res.json({success:false, msg:"Invalid token"});
        }
        let category = await Category.create({
            title: title,
            image: image,
            status: status,
            url:title.toLowerCase().split(" ").join("-")
        })
        if (category) {
            console.log(category)
            return res.json({ success: true, msg: 'Category added successfully'})
        }else{
            return res.json({success:false, msg:"Something went wrong"})
        }
        
    } catch (error) {
        console.log(error)
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default addCategory;