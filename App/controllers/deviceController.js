import { addDeviceService, deviceinfoService,assignDeviceService,unassignDeviceService } from "../services/deviceServices.js"

export const deviceinfo = async (req, res) => {
    const result =  await deviceinfoService(req)
    res.json(result)
}

export const addDevice = async (req, res) => {

    const result =  await addDeviceService(req)
    res.json(result)
}

export const assignDevice = async (req, res) => {
    const result =  await assignDeviceService(req)
    res.json(result)
}
export const unassignDevice = async (req, res) => {
    const result =  await unassignDeviceService(req)
    res.json(result)
}