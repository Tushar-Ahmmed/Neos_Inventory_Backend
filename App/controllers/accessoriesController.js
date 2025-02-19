import { createAccessoryService,updateAccessoryService, getAllAccessoriesService,getAccessoryByIdService,getAccessoryByCatService, deleteAccessoryService,assignAccessoryService,unassignAccessoryService } from "../services/accessoriesServices.js"

export const createAccessory = async (req, res) => {
    const result = await createAccessoryService(req)
    res.json(result)
}

export const updateAccessory = async (req, res) => {
    const result = await updateAccessoryService(req)
    res.json(result)
}

export const getAllAccessories = async (req, res) => {
    const result = await getAllAccessoriesService()
    res.json(result)
}

export const getAccessoryById = async (req, res) => {
    const result = await getAccessoryByIdService(req.params.id)
    res.json(result)
}

export const getAccessoryByCat = async (req, res) => {
    const result = await getAccessoryByCatService(req)
    res.json(result)
}

export const deleteAccessory = async (req, res) => {
  const result = await deleteAccessoryService(req)
    res.json(result)
}
export const assignAccessory = async (req, res) => {
    const result = await assignAccessoryService(req)
    res.json(result)
}

export const unassignAccessory = async (req, res) => {
    const result = await unassignAccessoryService(req)
    res.json(result)
}