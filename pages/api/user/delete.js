import connectToDb from '../../../middleware/connectToDb';
import User from '../../../models/User'
import jwt from 'jsonwebtoken'
connectToDb();

const deleteData = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { id, authtoken} = req.body;
        if (!id || !authtoken) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let {email} = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if(!email){
            return res.json({success:false, msg:"Invalid token"});
        }
        console.log(req.body)
        let user = await User.findOneAndDelete({_id:id})
        if (user) {
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