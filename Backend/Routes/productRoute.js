import express from 'express'
import { allProducts, productByCategory, productById } from '../Controller/productController.js'
import { userToken } from '../middleWares/userMiddleware.js'
import { addToCart, decrementCartQuantity, incrementCartQuantity, removeCart, viewCart } from '../Controller/cartController.js'
import { orderDetails, payment, success } from '../Controller/userPaymentController.js'


const router = express.Router()



//PRODUCT ROUTES


//user can see all products
router.get('/allProducts', allProducts)
//user can see products by id
router.get('/products/:id', productById)
//usr can see products by category
router.get("/products/category/:categoryName"  , productByCategory)

router.use(userToken)

//CART ROUTES

//user can add product to cart
router.post('/:userId/cart/:productId',  addToCart)
//user can view product in their cart
router.get('/cart/:id',  viewCart)
//user can increment cart product
router.post('/:userId/cart/:productId/increment',incrementCartQuantity )
//user can decrement product in their cart
router.post('/:userId/cart/:productId/decrement',decrementCartQuantity )
//user can remove product in their cart
router.post('/:userId/cart/:productId/remove',removeCart )


router.post('/payment/:Id' , payment)
router.get('/payment/success',success)
router.get('/order/:id' , orderDetails)


export default router


