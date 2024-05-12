import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const userToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: "Token verification failed" });
    }

    jwt.verify(token, process.env.USER_JWT_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.email = decode.email;
        next();
    });
};