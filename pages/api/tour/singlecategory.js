import connectToDb from '../../../middleware/connectToDb';
import Tour from '../../../models/Tour'
import jwt from 'jsonwebtoken'
connectToDb();

const fetchOne = async (req, res) => {
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { categoryUrl, type} = req.body;
        if (!categoryUrl || !type) {
            return res.json({ success: false, msg: "Url and type not provided" })
        }
        let tour;
        console.log(req.body)
        if(type=='all'){
            tour = await Tour.find({categoryUrl: categoryUrl});
        } else if(type=='basic'){
            tour = await Tour.find({$and:[{categoryUrl: categoryUrl}, {basic: true}]});
        } else if(type=='platinum'){
            tour = await Tour.find({$and:[{categoryUrl: categoryUrl}, {platinum: true}]});
        } else{
            tour = await Tour.find({$and:[{categoryUrl: categoryUrl}, {explorer: true}]});
        }
        if (tour) {
            return res.json({ success: true, msg: 'Fetched successfully', tour:tour})
        }else{
            return res.json({success:false, msg:"Something went wrong"})
        }
        
    } catch (error) {
        return res.json({success:false, msg:"Something went wrong 2"})
    }
}

export default fetchOne;