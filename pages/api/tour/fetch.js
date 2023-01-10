import connectToDb from '../../../middleware/connectToDb';
import Tour from '../../../models/Tour'
connectToDb();

const fetchData = async (req, res) => {
    try {
        if (req.method != 'GET') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let tour = await Tour.find({});
        if (tour) {
            return res.json({ success: true, msg: 'Tours Fetched', tour:tour})
        }else{
            return res.json({success:false, msg:"No Tour Found"})
        }
    } catch (error) {
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default fetchData;