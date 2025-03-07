import { mongoose } from "mongoose"
import ComputersModel from "../models/ComputersModel.js"
import UsersModel from "../models/UsersModel.js"
import { default_user_id } from "../config/config.js"

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
      const ObjectId = new mongoose.Types.ObjectId("67af3b12a55a523a84f93b73") //Default user id

      if(computer.Assigned_To.equals(ObjectId)) {
         let user = await UsersModel.findOne({ Email: email })
         if(!user) {
            return { "status":"Error", message: "User not found" }
         }

         await ComputersModel.updateOne({ Serial: serial }, { $set: { Assigned_To: user._id } })

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
            return { "status":"Error", message: "Assign updated in device list but not updated at user list" }
         }
        return { "status":"Success", message: "Device Assigned Successfully" }
        }
      else{
         return { "status":"Error", message: "Device already assigned" }
      }

   } catch (error) {      
      return { "status":"Error", message: error.message }
   }
}

export const unassignDeviceService = async (req) => {
   let serial = req.params.serial
   try {
      let computer = await ComputersModel.findOne({ Serial: serial })
      if(!computer) {
         return { "status":"Error", message: "Device not found" }
      }
      let user = await UsersModel.findOne({ _id: computer.Assigned_To })
      if(!user) {
         return { "status":"Error", message: "User not found" }
      }
      let assign = user.Devices.filter((device) => device.Device_id.equals(computer._id))
      if(assign.length === 0) {
         return { "status":"Error", message: "Device not assigned" }
      }
      let index = user.Devices.indexOf(assign[0])
      user.Devices[index].UnAssignDate = new Date()
      // await user.save()
     let updateUser = await UsersModel.findOneAndUpdate(
         { _id: computer.Assigned_To },
         { $set: { Devices: user.Devices } },
         { new: true }
      )
      if(!updateUser) {
         return { "status":"Error", message: "Device not unassigned" }
      }
      
      await ComputersModel.updateOne({ Serial: serial }, { $set: { Assigned_To: default_user_id } })
      return { "status":"Success", message: "Device Unassigned Successfully" }   
   } catch (error) {
      return { "status":"Error", message: error.message }
   }
}

export const deleteDeviceService = async (req) => {
   let serial = req.params.serial
   try {
      let result = await ComputersModel.deleteOne({ Serial: serial })
      if(result.deletedCount === 0) {
         return { "status":"Error", message: "Device not found" }
      }
      return { "status":"Success", message: "Device deleted successfully" }
   } catch (error) {
      return { "status":"Error", message: error.message }
   }
}

export const updateDeviceService = async (req) => {
   let serial = req.params.serial
   let reqBody = req.body
   try {
      let result = await ComputersModel.updateOne({ Serial: serial }, { $set: reqBody })
      if(result.nModified === 0) {
         return { "status":"Error", message: "Device not found" }
      }
      return { "status":"Success", message: "Device updated successfully" }
   } catch (error) {
      return { "status":"Error", message: error.message }
   }
}

export const allDevicesService = async (req) => {
   try {
        let result = await ComputersModel.find()
        if(!result){
            return { "status":"Error", message: "No Users found" }
        }
        return { "status":"Success", data: result }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }
}

export const allUnassignedDevicesService = async (req) => {
   try {
        let result = await ComputersModel.find({"Assigned_To":default_user_id})
        if(!result){
            return { "status":"Error", message: "No Users found" }
        }
        return { "status":"Success", data: result }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }
}
