import User from "../models/userModel.js";




//list all user

export const allUser = async (req,res)=>{
    try {

        const allUser = await User.find()

        if(allUser.length ===0){
           return res.status(404).json({message:"no user is found"})
        }
        res.status(200).json({allUser})
        
    } catch (error) {
        res.status(404).json({message:error})
    }
}



//admin can view user by id


export const adminViewUserById =async (req,res)=>{

    try {
        const {id} =req.params
        const oneUser = await User.findById(id)

        if(!oneUser){
           return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({oneUser})



        
    } catch (error) {
        res.status(404).json({message:"internal server error"})
        
    }
}


//list user by username

    export const adminViewUserByUserName =async (req,res)=>{
        try {

            const {userName} = req.params

            const user = await User.find({username:{$regex:new RegExp (userName , 'i')}})
            

            if(!user || user.length ==0){
              return res.status(404).json({message:"user not found"})
            }


            res.status(200).json({user})
            
        } catch (error) {
            res.status(404).json({message:"internal server error"})
            
        }
    }



//admin can delete user in database


      export const adminDeleteUser = async(req,res)=>{
        try {

            const {userId} =req.params

            const deleteUser = await User.findByIdAndDelete(userId)

            if(!deleteUser){
                return res.status(404).json({message:"no user found"})
            }
            res.status(200).json(deleteUser)
            
        } catch (error) {

            res.status(404).json({message:"internal server error"})
            
        }
      }


   //admin block user
        
         export const adminBlockUser = async(req,res)=>{
            try {
                const {userId}=req.params
                const userBlock = await User.findByIdAndUpdate({_id:userId} , {$set:{isDeleted:true}});

                if(!userBlock){
                    return res.status(404).json({message:"user not found"})
                }
                res.status(404).json({message:"user Blocked successfully"})
                
            } catch (error) {
                res.status(404).json({message:"intrenal server error" , error})
                
            }
         }


//admin unblock user

export const adminUnBlockUser = async(req,res)=>{
    try {
        const {userId}=req.params
        const userUnBlock = await User.findByIdAndUpdate({_id:userId} , {$set:{isDeleted:false}});

        if(!userUnBlock){
            return res.status(404).json({message:"user not found"})
        }
        res.status(404).json({message:"user unblocked successfully"})
        
    } catch (error) {
        res.status(404).json({message:"intrenal server error" , error})
        
    }
 }
    