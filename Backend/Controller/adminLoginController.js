import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


export const adminLogin = async (req,res)=>{
    try {
        const {email , password} =req.body;

        //JWT SETTING

        if(email==process.env.ADMIN_EMAIL && password ==process.env.ADMIN_PASSWORD){
            const token = jwt.sign({email} , process.env.ADMIN_JWT_SECRET);

        //COOKIE SETTING
        res.cookie('access_token' , token ,{httpOnly:true})
        .status(200).json({message :"admin logged successfully",token})

        }else {
            res.status(401).json({message:"unauthorised"})
        }
        
    } catch (error) {
        res.status(404).json({message:error})
        
    }
}



