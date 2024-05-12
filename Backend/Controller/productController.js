import Product from "../models/proudctModel.js";



//list all product

export const allProducts = async (req,res) => {
    try {
        const allProducts =await Product.find()
        if(!allProducts){
           return res.staus(404).json({message:"no products"})
        }
        res.status(200).json(allProducts)
    } catch (error) {
        res.staus(404).json({message:"no products found"})
        
    }
}


//show the product by id


export const productById = async (req,res)=>{

    try {
        const product_id = req.params.id


    const oneProduct = await Product.findOne({_id:product_id})

    if(!oneProduct){
       return res.status(404).json({message:"no product found"})
    }else {
       return res.status(200).json(oneProduct)
    }
        
    } catch (error) {

        res.status(500).json({messsage:"internal server error"})
        
    }
    


}



//show product by category

export const productByCategory = async(req,res)=>{

    try {
        const {categoryName}= req.params

          const productCategory = await Product.find({

        $or:[{category:{$regex : new RegExp(categoryName,'i')}},
            {title :   {$regex : new RegExp(categoryName,'i')}}
        ]
    }).select('title category price productImage')

    if(!productCategory || productCategory.length === 0){
        
          return  res.status(404).json({message:"no product found"})
        }
        return res.status(200).json( productCategory )
        
        
    } catch (error) {
        res.status(500).json({messsage:"internal server error"})
        
    
        
    }
    

    


}