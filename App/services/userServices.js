
import mongoose, { mongo } from "mongoose";
import UsersModel from "../models/UsersModel.js"
import User_DescModel from './../models/User_DescModel.js';

export const addUserService = async (req) => {
   try {
      let reqBody = req.body
      await UsersModel.create(reqBody)
      return { "status":"Success", message: "User added successfully" }
   } catch (error) {
      return { "status":"Error", message: error.message }
   }
}

export const allUsersService = async (req) => {
   try {
        let result = await UsersModel.find()
        if(!result){
            return { "status":"Error", message: "No Users found" }
        }
        return { "status":"Success", data: result }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }
}

export const userinfoService = async (req) => { 
   try {
      let email = req.params.email
      let result = await UsersModel.findOne({ Email: email })
        if(!result){
             return { "status":"Error", message: "User not found" }
        }

       if(result.length === 0){
         return { "status":"Error", message: "User not found" }
        }

        return { "status":"Success", data: result } 
        
   } catch (error) {    
      return { "status":"Error", message: error.message }
   }
}
export const addUserDescriptionService = async (req) => {
   try {
      let email = req.params.email
      let userinfo = await UsersModel.findOne({ Email: email })
      let User_id = userinfo._id
      let description = req.body
      description.User_id = User_id
     await User_DescModel.create(description)   
        return { "status":"Success", message: "Description added successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }
}

export const userFullInfoService = async (req) => {
   try {
      let email = req.params.email
      let EmailMatchStage = { $match: { Email: email } }
      let LookupStage = {
         $lookup: {
            from: "user_des",
            localField: "_id",
            foreignField: "User_id",
            as: "User_Des"
         }
      }

      let AccessoriesLookupStage = {
         $lookup: {
            from: "accessories",
            localField: "Accessories",
            foreignField: "_id",
            as: "Accessories"
            }
        }


      let UnwindStage = { $unwind: "$User_Des" } 
      let ProjectStage = {
         $project: {
            _id: 0,
            Email: 1,
            Enroll:1,
            Phone:1,
            Full_Name: 1,
            Unit: 1,
            Department: 1,
            Designation: 1,
            Phone_Number: 1,
            Accessories: 1,
            Devices: 1,
            User_Des: {
               DC_Logon_Name: "$User_Des.DC_Logon_Name",
               _3cx: "$User_Des._3cx",
               Mail_Box_Type: "$User_Des.Mail_Box_Type",
               Mail_Box_Database: "$User_Des.Mail_Box_Database",
               Office: "$User_Des.Office",
               Country: "$User_Des.Country",
               Reports_To: "$User_Des.Reports_To",
               OS_Type: "$User_Des.OS_Type",
               OS_Family: "$User_Des.OS_Family",
               OS_License: "$User_Des.OS_License",
               Licenses: "$User_Des.Licenses",
               Printer_Access: "$User_Des.Printer_Access",
               Wifi_Access: "$User_Des.Wifi_Access",
               VPN_Access: "$User_Des.VPN_Access",
               USB_Permission: "$User_Des.USB_Permission",
               MFA_Status: "$User_Des.MFA_Status",
               Join_date: "$User_Des.Join_date",
               Resign_date: "$User_Des.Resign_date"
            },

         }
      }
      let userinfo = await UsersModel.aggregate([EmailMatchStage,LookupStage,UnwindStage,AccessoriesLookupStage, ProjectStage,])

        if(!userinfo){
            return { "status":"Error", message: "User not found" }
        }
        if(userinfo.length === 0){
            return { "status":"Failed", message: "User Description not found" }
        }
        return { "status":"Success", data: userinfo }
   }
    catch (error) {
        return { "status":"Error", message: error.message }
    }
}

export const updateUserService = async (req) => {
    try {
        let email = req.params.email
        let update = req.body
        const user = await UsersModel.findOneAndUpdate({ Email: email }, update,{ new: true })
        if(!user){
            return { "status":"Error", message: "User not found" }
        }
        return { "status":"Success", message: "User updated successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }
}

export const updateUserDescriptionService = async (req) => {
    try {
        let email = req.params.email
        let update = req.body
        let userinfo = await UsersModel.findOne({ Email: email })
        let User_id = userinfo._id
        let description = await User_DescModel.findOneAndUpdate({ User_id: User_id }, update,{ new: true })
        if(!description){
            return { "status":"Error", message: "Description not found" }
        }
        return { "status":"Success", message: "Description updated successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }
}

export const deleteUserService = async (req) => {
    try {
        let email = req.params.email
        let userinfo = await UsersModel.findOne({ Email: email })  
        let User_id = userinfo._id
        await UsersModel.deleteOne({ Email: email })
        await User_DescModel.deleteOne({ User_id: User_id })
        return { "status":"Success", message: "User deleted successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }
}

export const findUserDescriptionService = async (req) => {
    try {
        let userId = req.params.userId
        userId = new mongoose.Types.ObjectId(userId)
        let userinfo = await User_DescModel.findOne({ User_id: userId })
   
        if(!userinfo){
            return { "status":"Error", message: "Description not found" }
        }
        return { "status":"Success", data: userinfo }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }   
}