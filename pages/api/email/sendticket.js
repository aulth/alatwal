import { createTransport } from "nodemailer";
const key = process.env.key;
const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.email,
        pass: key
    },
});



const sendTicket = async (req, res) => {
    const { email, ticket, bookingDetails, bookingNumber, name, type, date } = JSON.parse(JSON.stringify(req.body));
    console.log(req.body)
    if (!email || !ticket || !bookingDetails || !bookingNumber || !name) {
        return res.json({ success: false, msg: "All fields required" });
    }
    const mailOption = {
        from: `AlAtwal <${process.env.email}>`,
        to: email,
        subject: type + " - " + bookingDetails.title,
        html: type=='Ticket'?
        `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"> <div style="margin:50px auto;width:70%;padding:20px 0"> <div style="border-bottom:1px solid #eee"> <a href="" style="font-size:1.4em;color: #fa8006;text-decoration:none;font-weight:600">Al Altwal</a> </div> <p style="font-size:1.1em">Dear <b>${name}</b></p> <p>Your booking details are as as follows: </p> <p><b>Booking Number :</b> ${bookingNumber} </p> <p><b>Title :</b> ${bookingDetails.title} </p> <p><b>Date :</b> ${bookingDetails.date}</p><h5>${bookingDetails.adult}x Adult, ${bookingDetails.child}x Children, ${bookingDetails.infant}x Infant </h5> <p style="font-size:0.9em;">Regards,<br />Al Altwal</p> <hr style="border:none;border-top:1px solid #eee" /> <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"> <p>Al Altwal Inc</p> <p>Location here</p> <p>UAE</p> </div> </div> </div>`:
        `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"> <div style="margin:50px auto;width:70%;padding:20px 0"> <div style="border-bottom:1px solid #eee"> <a href="" style="font-size:1.4em;color: #fa8006;text-decoration:none;font-weight:600">Al Altwal</a> </div> <p style="font-size:1.1em">Dear <b>${name}</b></p> <p>Your booking details are as as follows: </p> <p><b>Booking Number :</b> ${bookingNumber} </p> <p><b>Title :</b> ${bookingDetails.title} </p> <p><b>Date :</b> ${date}</p><p style="font-size:0.9em;">Regards,<br />Al Altwal</p> <hr style="border:none;border-top:1px solid #eee" /> <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"> <p>Al Altwal Inc</p> <p>Location here</p> <p>UAE</p> </div> </div> </div>`,
        attachments: [
            { path:  ticket}]
    }
    transporter.sendMail(mailOption, (err, info) => {
        if (err) console.log(err)
        return res.json({ success: true, info, msg: type + ' sent to the client' });
    });
}

export default sendTicket;