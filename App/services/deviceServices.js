import ComputersModel from "../models/ComputersModel.js"

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
