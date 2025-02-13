import mongoose from "mongoose"

const AccessoriesCategoriesSchema = mongoose.Schema(
    {
        Title:{type:String, required:true, unique:true}
    },
    {
        timestamps:true,
        versionKey:false
    }
)

const AccessoriesCategoriesModel = mongoose.model("AccessoriesCategories",AccessoriesCategoriesSchema)
export default AccessoriesCategoriesModel