import express from "express"
import { ViewUserById, login, signup } from "../Controller/authController.js"
import  { cloudinaryUploadImg } from "../middleWares/uploadImage.js"

const router = express.Router() 

//user register
router.post('/register', cloudinaryUploadImg,  signup)

//user login
router.post('/Login', login)

//user by id
router.get('/view/:id',ViewUserById)


export default router;

