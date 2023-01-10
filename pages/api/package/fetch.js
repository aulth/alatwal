import connectToDb from '../../../middleware/connectToDb';
import Package from '../../../models/Package'
connectToDb();

const fetchData = async (req, res) => {
    try {
        if (req.method != 'GET') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let allPackage = await Package.find({});
        if (allPackage) {
            return res.json({ success: true, msg: 'Packages Fetched', allPackage:allPackage})
        }else{
            return res.json({success:false, msg:"No Package Found"})
        }
    } catch (error) {
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default fetchData;