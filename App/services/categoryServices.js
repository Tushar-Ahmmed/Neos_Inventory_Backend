
import CategoryModel from '../models/AccessoriesCategoriesModel.js'

export const createCategoryService = async(req)=>{
    
        const Title = req.body
        try {
            await CategoryModel.create(Title)
            return { "status":"Success", message: "Category added successfully" }
        } catch (error) {
            return { "status":"Error", message: error.message }
        }
    
}

export const updateCategoryService = async(req)=>{
    const catID = req.params.id
    const Title = req.body
    try {
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
    const catID = req.params.id
    try {
        let result =await CategoryModel.findByIdAndDelete(catID)
        if(!result){
            return { "status":"Error", message: "Category not found" }
        }
        return { "status":"Success", message: "Category deleted successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }
}