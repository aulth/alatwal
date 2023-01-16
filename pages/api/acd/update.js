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
            || !authtoken) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let {email} = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if(!email){
            return res.json({success:false, msg:"Invalid token"});
        }
        let cms;
        if(id){
            cms = await CMS.findOneAndUpdate({ _id: id }, {overview, status })
        }else{
            cms = await CMS.create({ title:title.toLowerCase(), overview:overview, status:status.toLowerCase() })
        }
        if (cms) {
            if(id){
                return res.json({ success: true, msg: 'Updated successfully' })
            }
            return res.json({ success: true, msg: 'Created successfully' })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }

    } catch (error) {
        return res.json({ success: false, msg: "Something went wrong 2" })
    }
}

export default add;