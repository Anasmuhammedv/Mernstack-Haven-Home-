import express from "express"
import { cloudinaryUploadImg } from "../middleWares/uploadImage.js"
import {  AdminViewProductByCategory, adminAllProduct, adminDeleteProduct, adminUpdateProduct, adminViewProductById, createProduct } from "../Controller/adminProductController.js"
import { adminLogin} from "../Controller/adminLoginController.js"
import { adminToken } from "../middleWares/adminMidddleware.js"
import { adminBlockUser, adminDeleteUser, adminUnBlockUser, adminViewUserById, adminViewUserByUserName, allUser } from "../Controller/adminUserController.js"
import { Shipping, adminOrderDetails, delivered, onTheWay, status } from "../Controller/adminOrders.js"

const router = express.Router()

//admin login setup
router.post('/login' , adminLogin)

//Admin view all user who registerd 
router.get('/allUser' ,allUser)

//admin view user by their id 
router.get('/user/:id' , adminViewUserById)

//admin view user by username
router.get('/userName/:userName',adminToken ,adminViewUserByUserName)

//admin delete user by id
router.delete('/delete/user/:userId' , adminDeleteUser)

//admin block user by id
router.post('/block/:userId', adminBlockUser)

//admin unblock user by id
router.post('/unblock/:userId' , adminUnBlockUser)

//admin can add new product
router.post('/add',cloudinaryUploadImg, createProduct)

//admin view all product
router.get('/allProduct' , adminAllProduct)

//admin can view product by id
router.get('/product/:id', adminViewProductById)

//Admin view product by category or title
router.get('/category/:categoryName' , AdminViewProductByCategory)

//admin delete product by id
router.delete('/delete/product/:id' , adminDeleteProduct)

//admin update the product
router.patch('/editProduct/:id',cloudinaryUploadImg, adminUpdateProduct)

//admin view all order
router.get('/order' , adminOrderDetails)

//admin view revenue generated
router.get('/revenue' , status)


router.put('/status/shipped/:id',Shipping)
router.put('/status/ontheway/:id',onTheWay)
router.put('/status/delivered/:id',delivered)


export default router