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
        let { title, image, status, authtoken, type, description} = req.body;
        if (!title || !image || !status || !authtoken || !description) {
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
            type:type,
            description:description,
            url:title.toLowerCase().split(" ").join("-")
        })
        if (category) {
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