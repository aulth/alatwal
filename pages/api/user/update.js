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
        let { userData, authtoken } = req.body;
        if (!userData || !authtoken) {
            return res.json({ success: false, msg: "Please fill all the fields" })
        }
        let { email } = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if (!email) {
            return res.json({ success: false, msg: "Invalid token" });
        }
        let user = await User.findOneAndUpdate( {_id:userData._id}, {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            verified: false,
            admin:userData.admin?userData.admin:false,
        })
        if (user) {
            let authtoken = jwt.sign({ name: user.name, email: user.email, id: user._id }, JWTSECRET)
            return res.json({ success: true, msg: 'Edited succesfully', authtoken: authtoken, id: user._id })
        } else {
            return res.json({ success: false, msg: "Sign up failed 1" })
        }

    } catch (error) {
        return res.json({ success: false, msg: "Edit failed 2" })
    }
}

export default register;