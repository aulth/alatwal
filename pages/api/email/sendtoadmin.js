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

const sendConfirmation = async (req, res) => {
    const { bookingInfo } = JSON.parse(JSON.stringify(req.body));
    console.log(bookingInfo);
    let htmlMsg = `
    <body style="width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; font-family: Helvetica, arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" class="backgroundTable main-temp" style="background-color: #d5d5d5;">
            <tbody>
                <tr>
                    <td>
                        <table width="600" align="center" cellpadding="15" cellspacing="0" border="0" class="devicewidth" style="background-color: #ffffff;border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family: Helvetica, arial, sans-serif;">
                            <tbody>
                                <tr>
                                    <td style="padding-top: 30px;">
                                        <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee; text-align: center;">
                                            <tbody>
                                                <tr>
                                                    <td style="padding-bottom: 10px;border-collapse: collapse;">
                                                        <a href="/"><img style="width: 100px;" src="https://tourism-zeta.vercel.app/logo.png" alt="AlAtwal" /></a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 14px; line-height: 18px; color: #666666;border-collapse: collapse;">
                                                        UAE Dubai
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 14px; line-height: 18px; color: #666666;border-collapse: collapse;">
                                                        Phone: +971-45752644 | Email: info@alatwal.com
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 25px;border-collapse: collapse;">
                                                        <strong>Order Number:</strong> ${bookingInfo.bookingNumber} | <strong>Order Date:</strong> ${new Date(bookingInfo.createdAt).getDate() + '/' + new Date(bookingInfo.createdAt).getMonth() + 1 + "/" + new Date(bookingInfo.createdAt).getFullYear()}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 25px;border-collapse: collapse;">
                                                        <a href=${"http://tourism-zeta.vercel.app/admin/bookings/view/" + bookingInfo.bookingNumber} >View Details</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 0;border-collapse: collapse;">
                                        <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb;">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 55%; font-size: 14px; line-height: 18px; color: #666666;">
                                                        <span style="font-weight: bold;">Name : </span> ${bookingInfo.firstName + " " + bookingInfo.lastName}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 55%; font-size: 14px; line-height: 18px; color: #666666;">
                                                        <span style="font-weight: bold;">Email : </span>  ${bookingInfo.email}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 55%; font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px;">
                                                        <span style="font-weight: bold;">Contact : </span> ${bookingInfo.contact}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                ${bookingInfo.item.map((booking, index) => {
        return `<tr>
                                <td style="padding-top: 0;">
                                    <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee;">
                                        <tbody>
                                            <tr>
                                                <td colspan="2" style="font-size: 14px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                                                   ${booking.title}
                                                </td>
                                            </tr>
                                            ${bookingInfo.bookingFor == 'tour' ?
                `<tr>
                                                    <td style="font-size: 14px; line-height: 18px; color: #757575; width: 440px;">
                                                        ${booking.adult}x Adult, ${booking.child}x Child, ${booking.infant}x Infant
                                                    </td>
                                                    <td style="width: 130px;"></td>
                                                </tr>` : ''
            }
                                            <tr>
                                            <td style="font-size: 14px; line-height: 18px; color: #757575;">
                                                ${bookingInfo.bookingFor == 'tour' ? booking.date : bookingInfo.date}
                                            </td>
                                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right;">
                                            </td>
                                        </tr>
                                        <tr>
                                        <td style="font-size: 14px; line-height: 18px; color: #757575;">
                                            ${bookingInfo.bookingFor == 'tour' ? '' : bookingInfo.type == 'UAE Visa' ? bookingInfo.visaDays : bookingInfo.type}
                                        </td>
                                        <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right;">
                                        </td>
                                    </tr>
                                        ${bookingInfo.bookingFor == 'tour' ?
                `<tr>
                                            <td style="font-size: 14px; line-height: 18px; color: #757575;">
                                            ${booking.time ? booking.time : booking.explorer ? booking.typeOfTicket : ''}
                                            </td>
                                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right; ">
                                                ${booking.explorer ? booking.typeOfTicket == 'privateTransfer' ? `<b style="color: #666666;">AED${booking.explorer ? booking.transport : ''}</b> Transport` : '' : ''}
                                            </td>
                                        </tr>`: ''
            }
                                        ${booking.explorer ? `<tr>
                                            <td style="font-size: 14px; line-height: 18px; color: #757575;">
                                            </td>
                                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right; ">
                                                ${booking.isFastTrackAddOn ? `<b style="color: #666666;">AED${booking.fastTrackAddOn * (Number(booking.adult) + Number(booking.child) + Number(booking.infant))}</b> FTON` : ''}
                                            </td>
                                        </tr>`: ''
            }                   
                                        ${bookingInfo.bookingFor == 'tour' ?
                `<tr>
                                            <td style="font-size: 14px; line-height: 18px; color: #757575; ">
                                            </td>
                                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right; ">
                                                <b style="color: #666666;">AED${booking.price}</b> Ticket
                                            </td>
                                        </tr>`: ''
            }
                                        <tr>
                                            <td style="font-size: 14px; line-height: 18px; color: #757575; ">
                                            </td>
                                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right; ">
                                                <b style="color: #666666;">AED${bookingInfo.bookingFor == 'tour' ? (booking.price + Number(booking.explorer ? booking.typeOfTicket == 'privateTransfer' ? booking.transport : 0 : 0) + Number(booking.isFastTrackAddOn ? (booking.fastTrackAddOn * (Number(booking.adult) + Number(booking.child) + Number(booking.infant))) : 0)) : bookingInfo.price}</b> Total
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>`
    })
        }
                                <tr>
                                    <td style="padding-top: 0;">
                                        <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb; margin-top: -5px;">
                                            <tbody>
                                                <tr>
                                                    <td rowspan="5" style="width: 55%;"></td>
                                                    <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px;">
                                                        Order Total
                                                    </td>
                                                    <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px; text-align: right;">
                                                        AED${bookingInfo.price}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-bottom: 10px;">
                                                    </td>
                                                    <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; text-align: right; padding-bottom: 10px;">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 10px;">
                                        <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner">
                                            <tbody>
                                                <tr>
                                                    <td colspan="2" style="font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                                                        Payment Method (${bookingInfo.paymentMethod})
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style="width: 100%; text-align: center; font-style: italic; font-size: 13px; font-weight: 600; color: #666666; padding: 15px 0; border-top: 1px solid #eeeeee;">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
    `
    if (!bookingInfo) {
        return res.json({ success: false, msg: "Booking Info Not Provided" });
    }
    const mailOption = {
        from: `AlAtwal <${process.env.email}>`,
        to: 'info@alatwal.com',
        subject: "New Order Received",
        html: htmlMsg
    };
    transporter.sendMail(mailOption, (err, info) => {
        if (err) console.log(err)
        return res.json({ success: true, info });
    });
}

export default sendConfirmation;