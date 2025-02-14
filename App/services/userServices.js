
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
export const userinfoService = async (req) => { 
   try {
      let email = req.params.email
      let result = await UsersModel.findOne({ Email: email }) 
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
