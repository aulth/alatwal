import connectToDb from '../../../middleware/connectToDb';
import jwt from 'jsonwebtoken'
connectToDb();

const add = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { authtoken} = req.body;
        if (!authtoken) {
            return res.json({ success: false, msg: "Please Login" });
        }
        let {isAdmin} = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if(!isAdmin){
            return res.json({success:false, msg:"Invalid token"});
        }
        return res.json({success:true, msg:"Admin authenticated"});
    } catch (error) {
        console.log(error)
        return res.json({ success: false, msg: error.message })
    }
}

export default add;