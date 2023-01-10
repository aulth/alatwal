import connectToDb from '../../../middleware/connectToDb';
import Visa from '../../../models/Visa'
connectToDb();

const fetchData = async (req, res) => {
    try {
        if (req.method != 'GET') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let allVisa = await Package.find({});
        if (allVisa) {
            return res.json({ success: true, msg: 'Visa Fetched', allVisa:allVisa})
        }else{
            return res.json({success:false, msg:"No Visa Found"})
        }
    } catch (error) {
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default fetchData;