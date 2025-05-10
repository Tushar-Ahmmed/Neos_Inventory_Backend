import { createAdministratorService,deleteAdministratorService,updateBySuperAdminService,findAdminService,updateProfileService,changePasswordService, getAdminEmailService,getAllAdminsService } from '../services/administratorServices.js'

export const administratorCreate = async (req, res) => {
    const result = await createAdministratorService(req)
    res.json(result)
}

export const administratorDelete = async (req, res) => {
    const result = await deleteAdministratorService(req)
    res.json(result)
}

export const updateBySuperAdmin = async (req, res) => {
    const result = await updateBySuperAdminService(req)
    res.json(result)
}

export const findAdmin = async (req, res) => {
    const result = await findAdminService(req)
    res.json(result)
}

export const updateProfile = async (req, res) => {
    const result = await updateProfileService(req)
    res.json(result)
}

export const changePassword = async (req, res) => {
    const result = await changePasswordService(req)
    res.json(result)
}
export const getAdminEmail = async (req, res) => {
    const result = await getAdminEmailService(req)
    res.json(result)
}
export const getAllAdmins = async (req, res) => {
    const result = await getAllAdminsService(req)
    res.json(result)
}