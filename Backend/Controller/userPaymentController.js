import Stripe from "stripe";
import User from "../models/userModel.js";
import dotenv from 'dotenv'
import Orders from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
dotenv.config()

const stripeInstance = Stripe(process.env.STRIPE_API_KEY)


let paymentData = {}




export const payment = async (req, res) => {
    try {
        const id = req.params.Id;
        const user = await User.findById(id).populate({
            path: 'cart',
            populate: { path: 'productId' }
        });

        

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartProducts = user.cart;

        if (cartProducts.length === 0) {
            return res.status(200).json({ message: "User cart is empty" });
        }
           let totalAmount =0;
           let totalQuantity=0;


        const lineItems = cartProducts.map((item) => {

             totalAmount +=item.productId.price * item.quantity
             totalQuantity += item.quantity

            return{
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.productId.title,
                        description: item.productId.description
                    },
                    unit_amount: Math.round(item.productId.price * 100)
                },
                quantity: item.quantity
                
            }

          
        });

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/payment/success", 
            cancel_url: "https://example.com/cancel"    
        });

        if (!session) {
            return res.status(500).json({ message: "Error occurred while creating session" });
        }

         paymentData = {
            id, 
            user,
            session
        };

        res.status(200).json({ message: "Stripe payment session created successfully", url: session.url });



        
    } catch (error) {

        res.status(404).json({message:"internal server error"})
        
    }
}


//PAYMENT SUCCESS
    


    export const success = async (req, res) => {
        try {
            const { id, user, session } = paymentData;
    
            // console.log("id is", id);
            // console.log("session is", session);
            // console.log("user is", user);
    
            const userId = user._id;
            const cartItem = user.cart;


            const productItems = cartItem.map((item) => item.productId);
    
            const order = await Orders.create({
                userId: id,
                productId: productItems, 
                orderId: session.id,
                paymentId: `demo ${Date.now()}`,
                totalPrice: session.amount_total / 100,
                // totalItems: productItems.quantity
            });
    
            if (!order) {
                return res.status(500).json({ message: "Error occurred while creating order" });
            }
    
            const orderId = order._id;
    
            // Update user document
            const userUpdate = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { order: orderId },
                 $set: { cart: [] } },
                { new: true }
            );
    
            if (!userUpdate) {
                return res.status(404).json({ message: "Error occurred while updating user" });
            }

            await Cart.deleteMany({ _id: { $in: cartItem.map(item => item._id) } });
    
            res.status(200).json({ message: "Payment successful" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    };




//USER CAN SEE THEIR ORDERS

     export const orderDetails = async(req,res)=>{
        try {

            const userId = req.params.id
            const user = await User.findById( userId).populate({
                path:'order',
                populate:{path:'productId'}
            })

            if(!user){
                return res.status(404).json({message:"user not found"})
            }

         

            // if (!user.order || user.order.length === 0) {
            //     return res.status(200).json({ message: "User order is empty", data: [] });
            // }

            res.status(200).json(user.order)

            
        } catch (error) {

            console.error(error)
            
            res.status(404).json({message:"internal serverr error" ,error})
        }
     }
    