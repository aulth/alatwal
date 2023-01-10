import connectToDb from '../../../middleware/connectToDb';
import Location from '../../../models/Location'
import jwt from 'jsonwebtoken'
connectToDb();

const update = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        console.log(req.body);
        let { title, image, status, featured, country, authtoken, id } = req.body;
        if (!title || !image || !status || !featured || !country || !authtoken) {
            return res.json({ success: false, msg: "All fields required" })
        }
        console.log(req.body);
        console.log(JSON.parse(authtoken))
        let {email} = jwt.verify(JSON.parse(authtoken), JWTSECRET);
        if(!email){
            return res.json({success:false, msg:"Invalid token"});
        }
        let location = await Location.findOneAndUpdate({_id:id},{
            title: title,
            country: country,
            featured: featured,
            status: status,
            image: image
        })
        console.log(location)
        if (location) {
            return res.json({ success: true, msg: 'Updted successfully'})
        }else{
            return res.json({success:false, msg:"Something went wrong"})
        }
        
    } catch (error) {
        console.log(error)
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default update;