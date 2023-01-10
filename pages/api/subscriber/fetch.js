import connectToDb from '../../../middleware/connectToDb';
import Subscriber from '../../../models/Subscriber';
connectToDb();

const fetchData = async (req, res) => {
    try {
        if (req.method != 'GET') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let subscriber = await Subscriber.find({});
        if (subscriber) {
            return res.json({ success: true, msg: 'Subscribers Fetched', subscriber:subscriber})
        }else{
            return res.json({success:false, msg:"No Subscriber Found"})
        }
    } catch (error) {
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default fetchData;