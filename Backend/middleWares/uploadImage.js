import cloudinary from 'cloudinary'
import multer  from 'multer';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

const multerStorage=multer.diskStorage({})

const upload = multer({
    storage:multerStorage,
    limits:{fileSize :2000000},
});




 export const cloudinaryUploadImg = (req, res, next) => {
    upload.single('image')(req, res, async error => {
        try {
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                req.cloudinaryImageUrl = result.secure_url;
            }
          
            next()
        } catch (error) {
            return next(error); 
            
        }
    });
};

    

