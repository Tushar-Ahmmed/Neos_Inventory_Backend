import { addUserService, userinfoService, addUserDescriptionService, userFullInfoService,updateUserService,updateUserDescriptionService,deleteUserService,allUsersService, findUserDescriptionService } from "../services/userServices.js"


export const addUser = async (req, res) => {
    const result =  await addUserService(req)
    res.json(result)
}
export const allUsers = async (req, res) => {
    const result =  await allUsersService(req)
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
    res.json(result)
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

export const findUserDescription = async (req,res) => {
    const result = await findUserDescriptionService(req)
    res.json(result)
}
