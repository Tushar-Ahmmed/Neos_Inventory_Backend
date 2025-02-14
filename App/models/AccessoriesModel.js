import mongoose from "mongoose"

const AccessoriesSchema = mongoose.Schema(
    {
        Cat_ID:{type:mongoose.Schema.Types.ObjectId, required:true},
        Brand:{type:String, required:true},
        Model:{type:String, default:null},
        Spec:{type:String, default:""},
        Quantity:{type:Number, required:true},
    },
    {
        timestamps:true,
        versionKey:false
    }
)

const AccessoriesModel = mongoose.model("Accessories", AccessoriesSchema)
export default AccessoriesModel
