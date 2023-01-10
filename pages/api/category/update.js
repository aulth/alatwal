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
        console.log(req.body);
        let { title, image, status, authtoken, id} = req.body;
        if (!title || !image || !status || !authtoken || !id) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let {email} = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if(!email){
            return res.json({success:false, msg:"Invalid token"});
        }
        console.log(req.body)
        let category = await Category.findOneAndUpdate({_id:id}, {
            title: title,
            image: image,
            status: status,
        })
        if (category) {
            console.log(category)
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