import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
{
    title:{
        type:String,
        require:true
    },
    description : {
        type:String,
        require:true
    },
    price :{
        type:Number,
        require:true
    },
    productImage:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    isDelete:{
        type:Boolean,
        default:false
    }

}
)

const Product =mongoose.model('Product', productSchema)
export default Product;