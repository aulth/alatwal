import connectToDb from '../../../middleware/connectToDb';
import Setting from '../../../models/Setting';
connectToDb();

const fetchData = async (req, res) => {
    try {
        if (req.method != 'GET') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let setting;
        setting = await Setting.find({});
        if (setting) {
            return res.json({ success: true, msg:'Setting Fetched', setting:setting})
        }else{
            return res.json({success:false, msg:"Not Found"})
        }
    } catch (error) {
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}
export default fetchData
