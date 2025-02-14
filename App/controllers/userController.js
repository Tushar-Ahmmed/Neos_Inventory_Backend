import { addUserService, userinfoService, addUserDescriptionService } from "../services/userServices.js"


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
