import connectToDb from '../../../middleware/connectToDb';
import jwt from 'jsonwebtoken'
import Booking from '../../../models/Booking';
connectToDb();

const add = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        console.log(req.body)
        let { firstName,
            lastName,
            email,
            contact,
            specialRequest,
            pickupLocation,
            paymentMethod,
            item,
            bookingFor,
            price,
            availability,
            paymentStatus,
            service,
            date,
            image,
            authtoken,
            type,
            visaDays,
            passport,
            photograph
        } = req.body;
        console.log(req.body.price)
        let bookingNumber = Math.floor(Math.random() * 1000000000);
        if (!firstName
            || !lastName
            || !email
            || !paymentMethod
            || !item
            || !bookingFor
            || !price) {
            return res.json({ success: false, msg: "All fields required" })
        }
        // if (!authtoken) {
        //     return res.json({ success: false, msg: "Please Login" });
        // }
        // let { id } = jwt.verify(authtoken, JWTSECRET);
        // console.log(id)
        // if (!id) {
        //     return res.json({ success: false, msg: "Invalid token" });
        // }

        let newBooking = await Booking.create({
            bookingNumber,
            firstName,
            lastName,
            email,
            contact,
            specialRequest,
            pickupLocation,
            paymentMethod,
            item,
            bookingFor,
            price,
            availability,
            paymentStatus,
            service,
            // userId: id?id:'',
            date,
            image: image,
            type,
            visaDays,
            passport,
            photograph
        })
        if (newBooking) {
            return res.json({ success: true, msg: 'Booking successfully', bookingNumber: bookingNumber })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }

    } catch (error) {
        console.log(error)
        return res.json({ success: false, msg: error.message })
    }
}

export default add;