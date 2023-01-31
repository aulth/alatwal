import connectToDb from '../../../middleware/connectToDb';
import User from '../../../models/User'
import jwt from 'jsonwebtoken'
connectToDb();
const JWTSECRET = "HELLO"
const login = async (req, res)=>{
    if(req.method!='POST'){
        return res.json({success:false, msg:"Method not allowed"})
    }
    let {email, password} = req.body;
    email = email.toLowerCase();
    let user = await User.findOne({'email':email});
    if(user){
        if(user.password==password){
            if(!user.admin){
                return res.json({success:false, msg:"Sorry, you are not an admin"})
            }
            let authtoken = jwt.sign({ name: user.name, email: user.email, id: user._id, isAdmin:true }, JWTSECRET)
            return res.json({ success: true, msg: 'Login succesfull', authtoken: authtoken, id:user._id, name:user.name, email:user.email, verified:user.verified})
        }
        return res.json({success:false, msg:'Password Incorrect'})
    }
    return res.json({success:false, msg:"User does not exist"});
}

export default login;