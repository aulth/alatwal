import connectToDb from '../../../middleware/connectToDb';
import Location from '../../../models/Location'
connectToDb();

const fetchLocation = async (req, res) => {
    try {
        if (req.method != 'GET') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let location = await Location.find({});
        if (location) {
            return res.json({ success: true, msg: 'Location Fetched', location:location})
        }else{
            return res.json({success:false, msg:"No Location Found"})
        }
    } catch (error) {
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default fetchLocation;