import connectToDb from '../../../middleware/connectToDb';
import Package from '../../../models/Package'
import jwt from 'jsonwebtoken'
connectToDb();

const addTour = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { title,
            tourId,
            tourTitle,
            language,
            description,
            price,
            discount,
            startingTime,
            withoutTransferAdultRate,
            withoutTransferChildRate,
            sharingTransferAdultRate,
            sharingTransferChildRate,
            privateTransferAdultRate,
            privateTransferChildRate,
            returnSharingBasisTransferAdultRate,
            returnSharingBasisTransferChildRate,
            returnPrivateBasisTransferAdultRate,
            returnPrivateBaisTransferAdultRate,
            transferOptionRemark } = req.body;
        if (!title
            || !tourId
            || !tourTitle
            || !language
            || !description
            || !price
            || !discount
            || !startingTime
            || !withoutTransferAdultRate
            || !withoutTransferChildRate
            || !sharingTransferAdultRate
            || !sharingTransferChildRate
            || !privateTransferAdultRate
            || !privateTransferChildRate
            || !returnSharingBasisTransferAdultRate
            || !returnSharingBasisTransferChildRate
            || !returnPrivateBasisTransferAdultRate
            || !returnPrivateBaisTransferAdultRate
            || !transferOptionRemark) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let verifyAuthtoken = jwt.verify(authtoken, JWTSECRET);
        if (!verifyAuthtoken) {
            return res.json({ success: false, msg: "Invalid token" });
        }
        let newPackage = await Package.create({
            title: title,
            tourId: tourId,
            tourTitle: tourTitle,
            language: language,
            description: description,
            price: price,
            discount: discount,
            startingTime: startingTime,
            withoutTransferAdultRate: withoutTransferAdultRate,
            withoutTransferChildRate: withoutTransferChildRate,
            sharingTransferAdultRate: sharingTransferAdultRate,
            sharingTransferChildRate: sharingTransferChildRate,
            privateTransferAdultRate: privateTransferAdultRate,
            privateTransferChildRate: privateTransferChildRate,
            returnSharingBasisTransferAdultRate: returnSharingBasisTransferAdultRate,
            returnSharingBasisTransferChildRate: returnSharingBasisTransferChildRate,
            returnPrivateBasisTransferChildRate: returnPrivateBasisTransferChildRate,
            returnPrivateBaisTransferAdultRate: returnPrivateBasisTransferAdultRate,
            transferOptionRemark: transferOptionRemark
        })
        if (newPackage) {
            return res.json({ success: true, msg: 'Added successfully' })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }

    } catch (error) {
        return res.json({ success: false, msg: "Something went wrong 2" })
    }
}

export default addTour;