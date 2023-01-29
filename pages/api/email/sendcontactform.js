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



const sendContactForm = async (req, res) => {
    console.log('sendcontactform api hitted');
    const { data } = req.body;
    console.log(data)
    if (!data) {
        return res.json({ success: false, msg: "All fields required" });
    }
    const mailOption = {
        from: `AlAtwal Contact <${process.env.email}>`,
        to: 'mohdusman.you@gmail.com',
        subject: data.subject,
        html: `<div style="width: 100%; padding: 10px; box-sizing: border-box;overflow-x: hidden;margin-left:-5px;">
        <div  style="width: 100%;background-color: #557DA1; padding: 5px 10px 5px 10px;">
            <h2 style="color:white;font-family: sans-serif;">Contact Form Notification</h2>
        </div>
        <div style="color:black;font-family:Helvetica , arial , sans-serif;">
            <table width="100%" align="center" cellpadding="15" cellspacing="0" border="0" class="devicewidth"
                style="background-color: #ffffff;border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family: Helvetica, arial, sans-serif;margin-top: 10px;">
                <tbody>
                    <tr>
                        <td style="font-size: 14px; line-height: 18px; color: #757575; ">
                            From
                        </td>
                        <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: left; ">
                            ${data.name}
                        </td>
                        <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: left; ">
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 14px; line-height: 18px; color: #757575; ">
                            Subject
                        </td>
                        <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: left; ">
                            ${data.subject}
                        </td>
                        <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: left; ">
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 14px; line-height: 18px; color: #757575; ">
                            Email
                        </td>
                        <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: left; ">
                            ${data.email}
                        </td>
                        <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: left; ">
                        </td>
                    </tr>
                </tbody>
            </table>
            <p style="font-size: 14px; line-height: 18px; color: #757575; text-align: left;padding: 10px; ">
            ${data.message}
            </p>
        </div>
    </div>`
    };
    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err)
            return res.json({ success: false, info });
        }
        console.log(info)
        return res.json({ success: true, info });
    });
}

export default sendContactForm;