import Product from '../models/proudctModel.js'
import { productJoi } from '../middleWares/joiValidation.js'
import Cart from '../models/cartModel.js';
import User from '../models/userModel.js'



export const createProduct = async (req,res)=>{
    try {
         
        const validatedProduct = await productJoi.validateAsync(req.body);

        console.log(validatedProduct);

 //admin can add new product
        const newProduct =new Product({
            title:validatedProduct.title,
            description:validatedProduct.description,
            price:validatedProduct.price,
            category:validatedProduct.category,
            productImage:req.cloudinaryImageUrl

        })

        await newProduct.save()

        // Respond with success message
        res.status(201).json({ message: "New product added" });
        
        
    } catch (error) {
        if(error.isJoi === true){
            res.status(400).json({message:"invalid data",details:error.details})
        }
        
    }
}


//admin can view all products in database


    export const adminAllProduct = async (req,res)=>{
        try {

            const allproduct = await Product.find()

            if(!allproduct){
              return res.status(404).json({message:"no products found"})
            }
            res.status(200).json({allproduct})
            
        } catch (error) {

            res.status(404).json({message:"internal server error",error})
            
        }
    }


//Admin can see the product by id

     export const adminViewProductById = async (req,res)=>{
        try {

            const {id}=req.params

            const productById = await Product.findById(id)
            
            if(!productById){
               return res.status(404).json({message:"product not found in this id"})
            }
            res.status(200).json({productById})
            
        } catch (error) {
            res.status(404).json({message:"internal server error"})
            
        }
     }


//admin can view product by category


export const AdminViewProductByCategory = async (req,res)=>{
    try {

        const { categoryName}= req.params

        const productCategory = await Product.find({
            $or :[
                {category : {$regex : new RegExp(categoryName , 'i')}},
                {title:{$regex : new RegExp(categoryName,'i')}}
            ]
        }).select('title category price')

        if(productCategory.length===0 || !productCategory){
           return res.status(404).json({message:"product not found"})
        }
        res.status(200).json({productCategory})
        
    } catch (error) {

        res.status(404).json({message:"internal server error",error})
        
    }
 }


 //admin edit product
    
     export const adminUpdateProduct = async(req,res)=>{
        try {
            
            const {id} = req.params

            const editProduct =await Product.findById(id)

            if(!editProduct){
               return res.status(404).json({message:"no product found "})
            }

            const {title,description,price,category} =req.body

            if (price !== undefined && price <= 0) {
                return res.status(400).json({ message: "Invalid price" });
              }

            if(title)         editProduct.title = title
            if(description)   editProduct.description = description
            if(category)      editProduct.category = category
            if(price !==undefined)         editProduct.price = price
            if(req.cloudinaryImageUrl) editProduct.productImage = req.cloudinaryImageUrl


            //save updated product

            await editProduct.save()

            console.log(editProduct);

            res.status(200).json({message:"product updated successfully" , editProduct:editProduct})

        } catch (error) {
            res.status(404).json({message:"internal server error"})
            
        }
     }



 
//Admin can delete the product in database


// export const adminDeleteProduct = async(req,res)=>{
//     try {
//         const {id}= req.params
//         const deleteProduct = await Product.findByIdAndDelete(id)

//         if(!deleteProduct){
//            return res.status(404).json({message:"no product found for deletion"})
//         }

//         const cartIndex =  Cart.findIndex(item=>item.equals(deleteProduct._id))

//         if(cartIndex!==-1){
//             Cart.splice(cartIndex,1)
//             await Cart.save()
//         }

        

//         res.status(200).json(deleteProduct)
        

//     } catch (error) {
//         res.status(404).json({message:"internal server error"})
        
//     }
//  }


export const adminDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Delete the product
        const deletedProduct = await Product.findByIdAndDelete(id);

        console.log(deletedProduct._id,"this is from admin delete");
        console.log(id,"this is id in delete product");
        const productId =deletedProduct._id

        if (!deletedProduct) {
            return res.status(404).json({ message: "No product found for deletion" });
        }

        // Remove the product from the cart
        await Cart.deleteMany({productId } );


        const usersWithProductInCart = await User.find({ cart: productId });
        for (const user of usersWithProductInCart) {
            User.cart = user.cart.filter(cartProductId => cartProductId.toString() !== productId.toString());
            await User.save();
        }
        // await User.cart.updateMany({ products: id }, { $pull: { products: id } });

        res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

   

     