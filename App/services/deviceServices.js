import { mongoose } from "mongoose"
import ComputersModel from "../models/ComputersModel.js"
import UsersModel from "../models/UsersModel.js"

export const addDeviceService = async (req) => {
   try {
      let reqBody = req.body
      await ComputersModel.create(reqBody)
      return { "tatus":"Success", message: "Device added successfully" }
   } catch (error) {
      return { "status":"Error", message: error.message }
   }
}

export const deviceinfoService = async (req) => {
   try {
      let serial = req.params.serial
      let result = await ComputersModel.findOne({ Serial: serial })
      return { "status":"Success", data: result }
   } catch (error) {
      return { "status":"Error", message: error.message }
   }
}

export const assignDeviceService = async (req) => {
   try {
      let serial = req.body.serial
      let email = req.body.email
      let assign_date = req.body.assign_date

      let computer = await ComputersModel.findOne({ Serial: serial })
      if(!computer) {
         return { "status":"Error", message: "Device not found" }
      }
      const ObjectId = new mongoose.Types.ObjectId("67af3b12a55a523a84f93b73")
      if(computer.Assigned_To.equals(ObjectId)) {
         let user = await UsersModel.findOne({ Email: email })
      if(!user) {
         return { "status":"Error", message: "User not found" }
      }

      await ComputersModel.updateOne({ Serial: serial }, { $set: { Assigned_To: user._id } })
    //   assign to shesh now have to create an object that contains computer serial number and assign date and a null return date.
    if(assign_date === undefined || assign_date === null || assign_date === "")  {
       assign_date = new Date()
      }
      let assign = { Device_id: computer._id, AssignDate: assign_date, UnAssignDate: null }
         let result = await UsersModel.findOneAndUpdate(
            { Email: email },
            { $push: { Devices: assign } },
            { new: true }
        );

        if(!result) {
            return { "status":"Error", message: "Device not assigned" }
        }
        return { "status":"Success", message: result }
        }
        else{
         return { "status":"Error", message: "Device already assigned" }
        }

   } catch (error) {      
      return { "status":"Error", message: error.message }
   }
}