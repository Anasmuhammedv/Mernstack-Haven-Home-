
import Orders from "../models/orderModel.js";




//Order details
 
   export const adminOrderDetails = async(req,res)=>{
    try {

        const orders = await Orders.find();
        if(!orders || orders.length==0){
            return res.status(404).json({message:"no order found"})
        }
        res.status(200).json(orders)
        
    } catch (error) {
        res.status(404).json({message:"internal server error"})
        
    }
   }




// total revenue generated


export const status = async (req, res) => {
    try {
      const totalStats = await Orders.aggregate([
        {
          $group: {
            _id: null,
            totalProduct: { $sum: { $size: "$productId" } }, 
            totalRevenue: { $sum: "$totalPrice" }
          }
        }
      ]);
  
      if (totalStats.length > 0) {
        res.status(200).json({ status: "Success", data: totalStats[0] });
      } else {
        res.status(200).json({
          status: "Success",
          data: { totalProduct: 0, totalRevenue: 0 }      
        });
      }}
       catch(error){
        res.status(404).json({message:"internal server error" , error})
       }
    }