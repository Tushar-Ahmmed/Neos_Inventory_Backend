
import { createCategoryService, updateCategoryService, deleteCategoryService,allCategoriesService } from "../services/categoryServices.js"

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

export const allCategories = async (req, res) => {
    const result = await allCategoriesService(req)
    res.json(result)
}