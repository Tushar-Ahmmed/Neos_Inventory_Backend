
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
      let UnwindStage = { $unwind: "$User_Des" } 
      let userinfo = await UsersModel.aggregate([EmailMatchStage,LookupStage,UnwindStage])
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