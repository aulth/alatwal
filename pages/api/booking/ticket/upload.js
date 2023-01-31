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
            ticket, type
        } = req.body;
        if (!bookingNumber || !ticket ) {
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
        console.log(item)
        if(type=="Ticket"){
            item = item.map((item, index)=>{
                if(item.id==bookedTourId){
                    item.ticket = ticket 
                }
                return item;
            })
        }else{
            item = item.map((item, index)=>{
                item.ticket = ticket
                return item;
            })
        }
        console.log(item)
        let newBooking = await Booking.findOneAndUpdate({bookingNumber:bookingNumber}, {item:item});
        if (newBooking) {
            return res.json({ success: true, msg: type + ' Uploaded' })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }

    } catch (error) {
        return res.json({ success: false, msg: error.message })
    }
}

export default update;