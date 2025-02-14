import mongoose from "mongoose"

const userDesSchema = mongoose.Schema(
    {
        User_id:{type:mongoose.Schema.Types.ObjectId, required:true,unique:true},
        DC_Logon_Name:{type:String, required:true, unique:true},
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
        OS_License:{type:String, enum: ["KMS Activated","Microsoft 365 Premium","NA"], default:"NA"},
        Licenses:{type:Array, default:"NA" },
        Printer_Access:{type:Boolean, default:false},
        Wifi_Access:{type:Boolean, default:false},
        USB_Permission:{type:Boolean, default:false},
        MFA_Status:{type:String, enum:["Enforced","Disabled"], default:"Disabled"},
        Join_date:{type:Date, default:null},
        Resign_date:{type:Date, default:null}
    },
    {
        timestamps:true,
        versionKey:false
    }
)

const User_DescModel = mongoose.model("User_Des",userDesSchema)
export default User_DescModel