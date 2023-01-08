import connectToDb from '../../../middleware/connecttodb';
import User from '../../../models/User'
connectToDb();

const verify = async (req, res) => {
    console.log("verify api hitted")
    console.log(JSON.parse(req.body))
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let {id} = JSON.parse(req.body);
        if (!id) {
            return res.json({ success: false, msg: "id not provided" })
        }
        let user = await User.findOneAndUpdate({_id:id}, {verified:true});
        if(!user){
            return res.json({success:false, msg:'User does not exist with this id'})
        }
        return res.json({success:true, msg:"Verified Successfully"});
    } catch (error) {
        console.log(error);
        return res.json({success:false, msg:"Verification failed"})
    }
}

export default verify;