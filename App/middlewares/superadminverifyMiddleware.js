import jwt from "jsonwebtoken"
import { JWT_KEY } from "../config/config.js"

export function superAdminVerifyMiddleware(req, res, next) {
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
                if (decoded.role !== "super admin") {
                    return res.status(401).json({
                        success: false,
                        message: "You are not authorized to this operation"
                    })
                }

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