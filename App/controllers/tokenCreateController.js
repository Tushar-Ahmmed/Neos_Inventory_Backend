// Token will be created and sent to the user
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_KEY } from "../config/config.js"
import AdministratorModel from "../models/AdiminstratorModel.js"

export async function tokenCreate(req, res) {
    const {email, password} = req.body
    const user = await AdministratorModel.findOne({ email })

    if (!user) {
        return res.json({status:"error", message:"Authentication failed. User not found."})
    }

    if (user.role !== "admin" && user.role !== "super admin") {
        return res.json({status:"error", message:"Authentication failed. User is not an administrator.."})
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.json({status:"error", message:"Authentication failed. Wrong password." })
    }
    // Create and send the token
    const token = jwt.sign({ email: user.email, role:user.role }, JWT_KEY, { expiresIn: "4h" })
    res.json({status:"success", token:token})
}