import connectToDb from '../../../middleware/connectToDb';
import User from '../../../models/User'
import jwt from 'jsonwebtoken'
connectToDb();

const register = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { name, email, password} = req.body;
        console.log(req.body)
        email = email.toLowerCase();
        if (!name || !email || !password) {
            return res.json({ success: false, msg: "Please fill all the fields" })
        }
        let user =await User.findOne({'email':email});
        if(user){
            return res.json({success:false, msg:'User already exists'})
        }
        user = await User.create({
            name: name,
            email: email,
            password: password,
            verified:false,
            admin:true,
        })
        if (user) {
            let authtoken = jwt.sign({ name: user.name, email: user.email, id: user._id, isAdmin:true }, JWTSECRET)
            return res.json({ success: true, msg: 'Signup succesfull', authtoken: authtoken, id:user._id})
        }else{
            return res.json({success:false, msg:"Sign up failed 1"})
        }
        
    } catch (error) {
        return res.json({success:false, msg:"Sign up failed 2"})
    }
}

export default register;