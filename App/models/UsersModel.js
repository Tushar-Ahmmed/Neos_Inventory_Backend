import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        Email:{type:String, unique:true, required:true,lowercase:true,},
        Enroll:{type:String, required:true, unique:true},
        Full_Name:{type:String, required:true},
        Unit:{type:String, required:true},
        Department:{type:String, required:true},
        Designation:{type:String, required:true},
        Phone:{type:Array, default: []},
        Accessories:{type:Array, default: []},
        Devices :{type:Array, default: []},
        Temp_Device :{type:Array, default: []},

    },
    {
        timestamps:true,
        versionKey:false
    }
)

const UsersModel = mongoose.model("Users",userSchema)
export default UsersModel
