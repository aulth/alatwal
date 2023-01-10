import connectToDb from '../../../middleware/connectToDb';
import jwt from 'jsonwebtoken'
import Subscriber from '../../../models/Subscriber';
connectToDb();

const add = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { name,
            email,
            verified, } = req.body;
        if (!name
            || !email
            || !verified) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let subscriber = await Subscriber.create({
            name,
            email,
            verified,
        })
        if (subscriber) {
            return res.json({ success: true, msg: 'Subscribed successfully' })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }

    } catch (error) {
        return res.json({ success: false, msg: "Something went wrong 2" })
    }
}

export default add;