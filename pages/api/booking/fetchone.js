import connectToDb from '../../../middleware/connectToDb';
import jwt from 'jsonwebtoken'
import Booking from '../../../models/Booking';
connectToDb();

const fetchOne = async (req, res) => {
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { bookingNumber} = JSON.parse(req.body);
        if (!bookingNumber) {
            return res.json({ success: false, msg: "Id not provided" })
        }
        let booking = await Booking.findOne({bookingNumber: bookingNumber});
        if (booking) {
            console.log(booking)
            return res.json({ success: true, msg: 'Fetched successfully', booking:booking})
        }else{
            return res.json({success:false, msg:"Something went wrong"})
        }
        
    } catch (error) {
        return res.json({success:false, msg:error.message})
    }
}

export default fetchOne;