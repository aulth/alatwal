import connectToDb from '../../../middleware/connectToDb';
import Visa from '../../../models/Visa'
import jwt from 'jsonwebtoken'
connectToDb();

const add = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { title,
            type,
            price,
            workingDays,
            overview,
            status,
            images} = req.body;
        if (!title
            || !type
            || !price
            || !workingDays
            || !overview
            || !status
            || !images) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let verifyAuthtoken = jwt.verify(authtoken, JWTSECRET);
        if (!verifyAuthtoken) {
            return res.json({ success: false, msg: "Invalid token" });
        }
        let newVisa = await Visa.create({
            title,
            type,
            price,
            workingDays,
            overview,
            status,
            images
        })
        if (newVisa) {
            return res.json({ success: true, msg: 'Added successfully' })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }

    } catch (error) {
        return res.json({ success: false, msg: "Something went wrong 2" })
    }
}

export default add;