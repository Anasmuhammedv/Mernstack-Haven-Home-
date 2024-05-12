
import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    productId : {
        type : mongoose.Schema.ObjectId,
        required:true,
        ref:"Product"
    },
    quantity:{
        type:Number,
        default:1
    }
})
const Cart = mongoose.model('Cart',cartSchema)
export default Cart