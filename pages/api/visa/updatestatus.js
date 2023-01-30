import connectToDb from '../../../middleware/connectToDb';
import Visa from '../../../models/Visa'
import jwt from 'jsonwebtoken'
connectToDb();

const update = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { data, authtoken} = req.body;
        if (!data) {
            return res.json({ success: false, msg: "All fields required" })
        }
        if (!authtoken) {
            return res.json({ success: false, msg: "Authtoken not provided" })
        }
        let { email } = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if (!email) {
            return res.json({ success: false, msg: "Invalid token" });
        }
        let newVisa = await Visa.findOneAndUpdate({url:data.url}, {
            status:data.status,
        });
        if (newVisa) {
            return res.json({ success: true, msg: 'Updated successfully' })
        } else {
            return res.json({ success: false, msg: "Update failed" })
        }
    } catch (error) {
        return res.json({ success: false, msg: error.message })
    }
}

export default update;