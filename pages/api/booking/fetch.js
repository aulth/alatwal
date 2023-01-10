import connectToDb from '../../../middleware/connectToDb';
import Booking from '../../../models/Booking'
connectToDb();

const fetchData = async (req, res) => {
    try {
        if (req.method != 'GET') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let booking = await Booking.find({});
        if (booking) {
            return res.json({ success: true, msg: 'Booking Fetched', booking:booking})
        }else{
            return res.json({success:false, msg:"No Booking Found"})
        }
    } catch (error) {
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default fetchData;