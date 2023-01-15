import connectToDb from '../../../middleware/connectToDb';
import Visa from '../../../models/Visa'
import jwt from 'jsonwebtoken'
import Booking from '../../../models/Booking';
connectToDb();

const update = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { bookingNumber,
            paymentStatus,
        } = req.body;
        if (!bookingNumber || !paymentStatus ) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let newBooking = await Booking.findOneAndUpdate ({bookingNumber:bookingNumber} ,{
            paymentStatus:paymentStatus,
        })
        if (newBooking) {
            return res.json({ success: true, msg: 'Booking Updated' })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }

    } catch (error) {
        return res.json({ success: false, msg: "Something went wrong 2" })
    }
}

export default update;