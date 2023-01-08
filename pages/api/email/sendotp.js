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



const sendOtp = async (req, res) => {
    console.log('sendotp api hitted');
    const { otp, to} = JSON.parse(JSON.stringify(req.body));
    console.log(req.body)
    if (!otp || !to) {
        return res.json({ success: false, msg: "All fields required" });
    }
    const mailOption = {
        from: `AlAtwal Registration <${process.env.email}>`,
        to: to,
        subject: "OTP Verification",
        html: `<h2>One Time Password</h2><h3>${otp}</h3>`,
    };
    transporter.sendMail(mailOption, (err, info) => {
        if (err) console.log(err)
        return res.json({ success:true, info});
    });
}

export default sendOtp;