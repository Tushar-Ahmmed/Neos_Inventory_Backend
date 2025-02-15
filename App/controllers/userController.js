import { addUserService, userinfoService, addUserDescriptionService, userFullInfoService,updateUserService,updateUserDescriptionService,deleteUserService } from "../services/userServices.js"


export const addUser = async (req, res) => {
    const result =  await addUserService(req)
    res.json(result)
}

export const userinfo = async (req, res) => {
    const result =  await userinfoService(req)
    res.json(result)
}

export const addUserDescription = async (req, res) => {
    const result =  await addUserDescriptionService(req)
    res.json(result)
}

export const userFullInfo = async (req, res) => {
    const result =  await userFullInfoService(req)
    res.json(result.data)
}

export const updateUser = async (req, res) => { 
    const result =  await updateUserService(req)
    res.json(result)
}

export const updateUserDescription = async (req, res) => {
    const result =  await updateUserDescriptionService(req)
    res.json(result)
}

export const deleteUser = async (req, res) => {
    const result =  await deleteUserService(req)
    res.json(result)
}