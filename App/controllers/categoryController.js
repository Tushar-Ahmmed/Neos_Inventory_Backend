
import { createCategoryService, updateCategoryService, deleteCategoryService } from "../services/categoryServices.js"

export const createCategory = async (req, res) => {
    const result = await createCategoryService(req)
    res.json(result)
}

export const updateCategory = async (req, res) => {
    const result = await updateCategoryService(req)
    res.json(result)
}

export const deleteCategory = async (req, res) => {
    const result = await deleteCategoryService(req)
    res.json(result)
}