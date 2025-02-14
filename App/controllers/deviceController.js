import { addDeviceService, deviceinfoService } from "../services/deviceServices.js"

export const deviceinfo = async (req, res) => {
    const result =  await deviceinfoService(req)
    res.json(result)
}

export const addDevice = async (req, res) => {

    const result =  await addDeviceService(req)
    res.json(result)
}