import jwt from "jsonwebtoken"
import { JWT_KEY } from "../config/config.js"

export function tokenVerifyMiddleware(req, res, next) {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token is required"
        })
    }
    try {
        jwt.verify(token, JWT_KEY, function (err, decoded) {
            if (err) {
                res.status(401).json({
                    status:"invalid token", data:err
                })
            }
            else {
                req.user = decoded
                next()
            }
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        })
    }
}