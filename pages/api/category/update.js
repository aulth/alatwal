import connectToDb from '../../../middleware/connectToDb';
import Category from '../../../models/Category'
import jwt from 'jsonwebtoken'
connectToDb();

const update = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { title, image, status, authtoken, id, type, description} = req.body;
        console.log(req.body.description)
        if (!title || !image || !status || !authtoken || !id || !type || !description) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let {email} = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if(!email){
            return res.json({success:false, msg:"Invalid token"});
        }
        let category = await Category.findOneAndUpdate({_id:id}, {
            title: title,
            image: image,
            status: status,
            type:type,
            description:description
        })
        if (category) {
            return res.json({ success: true, msg: 'Updted successfully'})
        }else{
            return res.json({success:false, msg:"Something went wrong"})
        }
        
    } catch (error) {
        console.log(error)
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default update;