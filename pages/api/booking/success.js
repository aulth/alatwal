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
        let { bookingNumber} = req.body;
        if (!bookingNumber) {
            return res.json({ success: false, msg: "Booking Number Not Provided" })
        }
        console.log(req.body)
        let newBooking = await Booking.findOneAndUpdate ({bookingNumber:bookingNumber} ,{
            paymentStatus:'success',
        })
        if (newBooking) {
            return res.json({ success: true, msg: 'Payment Success'  })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }

    } catch (error) {
        return res.json({ success: false, msg: "Something went wrong 2" })
    }
}

export default update;