import User from '../models/userModel.js';
import Product from "../models/proudctModel.js"
import Cart from '../models/cartModel.js';



//user can add product in to the cart
export const addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.params;

        // Find user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find or create cart item
        let cartItem = await Cart.findOne({ userId: user._id, productId: product._id });

        // If the product already exists in the cart, increment quantity
        if (cartItem) {
            cartItem.quantity++;
            await cartItem.save();
            return res.status(201).json({ message: "Product incremented" });

            
        } else {
            // If the product does not exist, create a new cart item
            cartItem = await Cart.create({
                userId: user._id,
                productId: product._id,
                quantity: 1
            });
            
                    // Add product to user's cart
                    user.cart.push(cartItem._id);
                    await user.save();
            
                    return res.status(200).json({ message: "Product added to cart successfully" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




//view product in the cart


export const viewCart = async(req,res)=>{
    try {
        const {id}=req.params
        const user = await User.findById(id).populate({
            path : 'cart',
            populate : { path : 'productId'}
        });

        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        // if(!user.cart || user.cart.length === 0){
        //     return res.status(200).json({message:"user cart is empty" , data:[]})
        // }
        res.status(200).json(user.cart)
    } catch (error) {

        return res.status(404).json({message:"internal server error"})
        
    }
}


//increment cart count   

export const incrementCartQuantity = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;
        // const {quantityIncrement} =req.body;
        
        
        //find user by id
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        //find product by id

        const product = await Product.findById(productId)

        if(!product){
            return res.status(404).json({message:"product not found"})
        }

        //find or create cart item

        let cartItem = await Cart.findOne({userId : user._id  ,   productId : product._id})
        if(cartItem){

            cartItem.quantity+=1
          
                await cartItem.save();
        }
        res.status(201).json({message:"quantity incremented"})


    } catch (error) {

        res.status(500).json({message:"internal server error"})
        
    }
}

//decrement cart count

export const decrementCartQuantity = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;
        const {quantityDecrement} =req.body;
        
        
        //find user by id
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        //find product by id

        const product = await Product.findById(productId)

        if(!product){
            return res.status(404).json({message:"product not found"})
        }

        //find or create cart item

        let cartItem = await Cart.findOne({userId : user._id  ,   productId : product._id})
        if(cartItem){


           


            if (cartItem.quantity >1) {
                cartItem.quantity -= 1;
                await cartItem.save();
            } else {
                // If decrement will make quantity negative, set quantity to 0
                cartItem.quantity = 1
                await cartItem.save();
            }
        }
        res.status(201).json({message:"quantity decremented"})


    } catch (error) {

        res.status(500).json({message:"internal server error"})
        
    }
}




//remove item from the cart

export const removeCart = async (req,res)=>{
    try {
        const { userId} =req.params
        const { productId}=req.params

        //find user 
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"user not found"})

        }
        
        //find product
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message:"product not found"})
        }

        let cartItem = await Cart.findOneAndDelete({userId:user._id , productId:product._id})

        if(!cartItem){
            return res.status(404).json({message:"product not found in the user cart"})

        }

        //find the index of the cartitem in the user cart item array
        const cartItemIndex =user.cart.findIndex(item=> item.equals(cartItem._id))
        

        //if the cart item is found remove from the user cart
        if(cartItemIndex !==-1){
            user.cart.splice(cartItemIndex,1)
            await user.save()
        }
        return res.status(200).json({message:"product deleted successfully"})

    } catch (error) {

        res.status(500).json({message:"internal server error"})
        
    }
}



