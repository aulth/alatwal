import connectToDb from '../../../middleware/connectToDb';
import Setting from '../../../models/Setting'
import jwt from 'jsonwebtoken'
connectToDb();

const add = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { settingData, authtoken } = req.body;
        if (!settingData
            || !authtoken) {
            return res.json({ success: false, msg: "All fields required" })
        }
        let { email } = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if (!email) {
            return res.json({ success: false, msg: "Invalid token" });
        }
        let setting;
        console.log(req.body.settingData.service3Link)
        setting = await Setting.findOneAndUpdate({_id:'63c5457667606d73aac45128'}, {
            footerFbLink: settingData.footerFbLink,
            footerInstagramLink: settingData.footerInstagramLink,
            footerWhatsappNumber: settingData.footerWhatsappNumber,
            footerTripadvisor: settingData.footerTripadvisor,
            service1Title: settingData.service1Title,
            service1Link: settingData.service1Link,
            service2Title: settingData.service2Title,
            service2Link: settingData.service2Link,
            service3Title: settingData.service3Title,
            quickContact1: settingData.quickContact1,
            quickContact2: settingData.quickContact2,
            companyAddress: settingData.companyAddress,
            companyEmail: settingData.companyEmail,
            companyContact: settingData.companyContact,
            companyFax: settingData.companyFax,
            companyVAT: settingData.companyVAT,
            trn: settingData.trn,
            beneficiary: settingData.beneficiary,
            bankswift: settingData.bankswift,
            iban: settingData.iban,
            accountNumber: settingData.accountNumber,
            bank:settingData.bank,
            service3Link: req.body.settingData.service3Link,
        })
        if (setting) {
            console.log(setting)
            return res.json({ success: true, msg: 'Updated successfully' })
        } else {
            return res.json({ success: false, msg: "Something went wrong" })
        }

    } catch (error) {
        return res.json({ success: false, msg: "Something went wrong 2" })
    }
}

export default add;