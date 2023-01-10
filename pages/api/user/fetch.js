import connectToDb from '../../../middleware/connectToDb';
import User from '../../../models/User'
import jwt from 'jsonwebtoken'
connectToDb();
const JWTSECRET = "HELLO"
const fetch = async (req, res)=>{
    if(req.method!='POST'){
        return res.json({success:false, msg:"Method not allowed"})
    }
    let {authtoken} = req.body;
    let verifyToken = jwt.verify(authtoken, JWTSECRET);
    if(!verifyToken){
        return res.json({success:false, msg:"token invalid"})
    }
    let user = await User.find({});
    if(!user){
       return res.json({success:false, msg:"No user found"}); 
    }
    return res.json({success:true, msg:"User fetched", user:user});
}

export default fetch;