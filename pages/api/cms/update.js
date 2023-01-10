import connectToDb from '../../../middleware/connectToDb';
import CMS from '../../../models/CMS'
import jwt from 'jsonwebtoken'
connectToDb();

const add = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { title,
            overview,
            status, authtoken, id } = req.body;
        if (!title
            || !overview
            || !status
            || !authtoken
            || !id) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let verifyAuthtoken = jwt.verify(authtoken, JWTSECRET);
        if (!verifyAuthtoken) {
            return res.json({ success: false, msg: "Invalid token" });
        }
        let cms = await CMS.findOneAndUpdate({_id:id},{title, overview, status})
        if (cms) {
            return res.json({ success: true, msg: 'Updated successfully' })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }

    } catch (error) {
        return res.json({ success: false, msg: "Something went wrong 2" })
    }
}

export default add;