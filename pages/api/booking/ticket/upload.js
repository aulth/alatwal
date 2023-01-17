import connectToDb from '../../../../middleware/connectToDb';
import jwt from 'jsonwebtoken'
import Booking from '../../../../models/Booking';
connectToDb();

const update = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { bookingNumber,
            authtoken,
            bookedTourId,
            ticket
        } = req.body;
        if (!bookingNumber || !bookedTourId || !ticket ) {
            return res.json({ success: false, msg: "All fields required" })
        }
        if (!authtoken ) {
            return res.json({ success: false, msg: "Please Login" })
        }
        let {email} = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if(!email){
            return res.json({success:false, msg:"Invalid token"});
        }
        let {item} = await Booking.findOne({bookingNumber: bookingNumber});
        item = item.map((item, index)=>{
            if(item.id==bookedTourId){
                item.ticket = ticket 
            }
            return item;
        })
        let newBooking = await Booking.findOneAndUpdate({bookingNumber:bookingNumber, item:item});
        if (newBooking) {

            return res.json({ success: true, msg: 'Ticket Uploaded' })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }

    } catch (error) {
        return res.json({ success: false, msg: "Something went wrong 2" })
    }
}

export default update;