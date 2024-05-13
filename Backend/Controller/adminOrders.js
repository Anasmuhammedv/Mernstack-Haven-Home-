
import Orders from "../models/orderModel.js";





  export const adminOrderDetails = async (req, res) => {
    try {
        const orders = await Orders.find().populate('productId').populate('cart');
        
        if (!orders || orders.length == 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        console.log(orders);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
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
        res.status(200).json(  totalStats[0] );
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


//order status showing
  
  //1.editing status to shipping
  

  export const Shipping = async (req, res) => {
      try {
          const { id } = req.params;
  
  
          const update = await Orders.findByIdAndUpdate(id, { $set: { orderStatus: "shipped" } });
  
          if (!update) {
              return res.status(404).json({ message: "No product found for update" });
          }
  
          
          await update.save();
  
          res.status(200).json({ message: "Order is shipped successfully" });
      } catch (error) {
          res.status(500).json({ message: "Internal server error", error });
      }
  }


  //2.status updating to on the way
  export const onTheWay = async(req,res)=>{
    
    try {
      const { id } = req.params;


      const update = await Orders.findByIdAndUpdate(id, { $set: { orderStatus: "on the way" } });

      if (!update) {
          return res.status(404).json({ message: "No product found for update" });
      }

      
      await update.save();

      res.status(200).json({ message: "Order is on the way" });
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
  }

  }


  //3.status updated to delivered

  export const delivered = async(req,res)=>{

    try {
      const { id } = req.params;


      const update = await Orders.findByIdAndUpdate(id, { $set: { orderStatus: "delivered" } });

      if (!update) {
          return res.status(404).json({ message: "No product found for update" });
      }

      
      await update.save();

      res.status(200).json({ message: "Order deliverd successfully" });
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
  }

  }
  


   