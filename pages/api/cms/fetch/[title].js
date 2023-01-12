import connectToDb from '../../../../middleware/connectToDb';
import CMS from '../../../../models/CMS'
connectToDb();

const fetchData = async (req, res) => {
    let { title } = req.query;
    try {
        if (req.method != 'GET') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let cms;
        cms = await CMS.findOne({ title: title });
        if (cms) {
            return res.json({ success: true, msg: title + ' CMS Fetched', cms: cms })
        } else {
            return res.json({ success: false, msg: title + " Not Found" })
        }
    } catch (error) {
        return res.json({ success: false, msg: "Something went wrong 2" })
    }
}
export default fetchData
