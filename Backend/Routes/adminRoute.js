import express from "express"
import { cloudinaryUploadImg } from "../middleWares/uploadImage.js"
import {  AdminViewProductByCategory, adminAllProduct, adminDeleteProduct, adminUpdateProduct, adminViewProductById, createProduct } from "../Controller/adminProductController.js"
import { adminLogin} from "../Controller/adminLoginController.js"
import { adminToken } from "../middleWares/adminMidddleware.js"
import { adminBlockUser, adminDeleteUser, adminViewUserById, adminViewUserByUserName, allUser } from "../Controller/adminUserController.js"
import { adminOrderDetails, status } from "../Controller/adminOrders.js"

const router = express.Router()

//admin login setup
router.get('/login' , adminLogin)

//Admin view all user who registerd 
router.get('/allUser' ,adminToken,allUser)

//admin view user by their id 
router.get('/user/:id' ,adminToken, adminViewUserById)

//admin view user by username
router.get('/userName/:userName',adminToken ,adminViewUserByUserName)

//admin delete user by id
router.delete('/delete/user/:userId' , adminDeleteUser)

//admin block user by id
router.post('/block/:userId', adminBlockUser)

//admin unblock user by id
router.post('/unblock/:userId' , adminBlockUser)

//admin can add new product
router.post('/add',cloudinaryUploadImg,adminToken, createProduct)

//admin view all product
router.get('/allProduct',adminToken , adminAllProduct)

//admin can view product by id
router.get('/product/:id',adminToken, adminViewProductById)

//Admin view product by category or title
router.get('/category/:categoryName',adminToken , AdminViewProductByCategory)

//admin delete product by id
router.delete('/delete/product/:id' ,adminToken, adminDeleteProduct)

//admin update the product
router.patch('/editProduct/:id',cloudinaryUploadImg,adminToken , adminUpdateProduct)

//admin view all order
router.get('/order' ,adminToken, adminOrderDetails)

//admin view revenue generated
router.get('/revenue',adminToken , status)


export default router