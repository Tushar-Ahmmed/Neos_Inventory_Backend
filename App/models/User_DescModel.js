import mongoose from "mongoose"

const userDesSchema = mongoose.Schema(
    {
        User_id:{type:mongoose.Schema.Types.ObjectId, required:true},
        DC_Logon_Name:{type:String, required:true},
        _3cx:{type:String, default:null},
        Mail_Box_Type:{type:String, required:true},
        Mail_Box_Database:{type:String, required:true},
        Office:{type:String, required:true},
        Country:{type:String, required:true},
        Reports_To:{type:String, required:true},
        OS_Type:{type:String, enum: ["Windows", "Ubuntu", "Mac"], required:true},
        OS_Family:{
            type: String,
            enum: ["Enterprise", "Pro", "Others","Ubuntu"],
            required: true
        },
        OS_License:{type:String, required:true},
        Licenses:{type:Array, required:true},
        Printer_Access:{type:Boolean, required:true},
        Wifi_Access:{type:Boolean, required:true},
        USB_Permission:{type:Boolean, required:true},
        MFA_Status:{type:Boolean, required:true},
        Join_date:{type:Date, required:true},
        Resign_date:{type:Date, default:null}

    },
    {
        timestamps:true,
        versionKey:false
    }
)

const UserDesc = mongoose.model("User_Desc",userDesSchema)
export default UserDesc