
import AdministratorModel from "../models/AdiminstratorModel.js"
import bcrypt from "bcrypt"


export const createAdministratorService = async (req) => {
    try {
        const { name, email, password } = req.body
        const role = req.body.role
        if (role !== "admin" && role !== "super admin") {
            role = "admin"
        }
        const admin = new AdministratorModel({
            name,
            email,
            password,
            role
        })
        await admin.save()
        return {
            status: "Success",
            message: "Administrator created successfully"
        }
    } catch (error) {
        return {
            status: "Error",
            message: error.message
        }
    }
}

export const deleteAdministratorService = async (req) => {
    try {
        const { email } = req.body
        const deleteResult = await AdministratorModel.findOne({ email }).deleteOne()
        if (deleteResult.deletedCount === 0) {
            return {
                status: "Error",
                message: "Administrator not found"
            }
        }
        return {
            status: "Success",
            message: "Administrator deleted successfully"
        }
    }
    catch (error) {
        return {
            status: "Error",
            message: error.message
        }
    }
}

export const updateBySuperAdminService = async (req) => {
    try {
        const email = req.params.email
        const updatedData = req.body

        if(updatedData.password !==null || updatedData.password !== "" || updatedData.password !== undefined){
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(updatedData.password, salt)
            updatedData.password = hashedPass
        }
        const updateResult = await AdministratorModel.findOneAndUpdate({ email }, updatedData)
        if (!updateResult) {
            return {
                status: "Error",
                message: "Administrator not found"
            }
        }   
        return {
            status: "Success",
            message: "Administrator updated successfully"
        }
    }
    catch (error) {
        return {
            status: "Error",
            message: error.message
        }
    }
}

export const findAdminService = async (req) => {
    try {
        const email  = req.params.email
        const admin = await AdministratorModel.findOne({ email:email })
        if(!admin){
            return{
                status: "Error", message: "Administrator not found"
            }
        }
        return {
            status: "Success",
            data: admin
        }
    }
    catch (error) {
        return {
            status: "Error",
            message: error.message
        }
    }
}

export const updateProfileService = async (req) => {
    try {
        const user = req.user
        const email = user.email
        const name = req.body.name
        const updatedData = { name }
        const updateResult = await AdministratorModel.findOneAndUpdate({ email }, updatedData)
        if (!updateResult) {
            return {
                status: "Error",
                message: "Administrator not found"
            }
        }   
        return {
            status: "Success",
            message: "Profile updated successfully"
        }
    }
    catch (error) {
        return {
            status: "Error",
            message: error.message
        }
    }
}

export const changePasswordService = async (req) => {
    try {
        const user = req.user
        const email = user.email
        const password = req.body.password
        const currentPassword = req.body.currentPassword

        const User = await AdministratorModel.findOne({ email })

        if (!User) {
            return {status: "Error", message: "Authentication failed. User not found." }
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(currentPassword, User.password)
        if (!isMatch) {
            return { status: "Error", message: "Current password Wrong. Contact to admin" }
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        const updatedData = { password:hashedPass }
        const updateResult = await AdministratorModel.findOneAndUpdate({ email }, updatedData)
        if (!updateResult) {
            return {
                status: "Error",
                message: "Administrator not found"
            }
        }   
        return {
            status: "Success",
            message: "Password changed successfully"
        }
    }
    catch (error) {
        return {
            status: "Error",
            message: error.message
        }
    }
}

export const getAllAdminsService = async (req) => {
    try {
        
        const Users = await AdministratorModel.find({})

        if (!Users) {
            return {status: "Error", message: "No user was Found" }
        }  
        return {
            status: "Success",
            data: Users
        }
    }
    catch (error) {
        return {
            status: "Error",
            message: error.message
        }
    }
}


export const getAdminEmailService = async(req)=>{
    return req.user.email
}
