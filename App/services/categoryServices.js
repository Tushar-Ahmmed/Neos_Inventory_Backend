
import CategoryModel from '../models/AccessoriesCategoriesModel.js'

export const createCategoryService = async(req)=>{
    
    try {
        const Title = req.body
        await CategoryModel.create(Title)
        return { "status":"Success", message: "Category added successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }
    
}

export const updateCategoryService = async(req)=>{
    try {
        const catID = req.params.id
        const Title = req.body
        let result =await CategoryModel.findByIdAndUpdate(catID, Title)
        if(!result){
            return { "status":"Error", message: "Category not found" }
        }
        return { "status":"Success", message: "Category updated successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }
}

export const deleteCategoryService = async(req)=>{
    try {
        const catID = req.params.id
        let result =await CategoryModel.findByIdAndDelete(catID)
        if(!result){
            return { "status":"Error", message: "Category not found" }
        }
        return { "status":"Success", message: "Category deleted successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }
}

export const allCategoriesService = async(req)=>{
    try {
        let result =await CategoryModel.find()
        if(!result){
            return { "status":"Error", message: "No Categories found" }
        }
        return { "status":"Success", data: result }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }
}