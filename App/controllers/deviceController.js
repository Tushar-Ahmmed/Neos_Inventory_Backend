import { addDeviceService, deviceinfoService,assignDeviceService,unassignDeviceService,updateDeviceService, deleteDeviceService, allDevicesService, allUnassignedDevicesService } from "../services/deviceServices.js"

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
export const updateDevice = async (req, res) => {
    const result =  await updateDeviceService(req)
    res.json(result)
}
export const deleteDevice = async (req, res) => {
    const result =  await deleteDeviceService(req)
    res.json(result)
}
export const allDevices = async (req, res) => {
    const result =  await allDevicesService(req)
    res.json(result)
}
export const allUnassignedDevices = async (req, res) => {
    const result =  await allUnassignedDevicesService(req)
    res.json(result)
}

