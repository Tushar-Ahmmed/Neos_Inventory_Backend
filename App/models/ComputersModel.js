import mongoose from "mongoose"

const ComputerSchema = mongoose.Schema(
    {
        Type:{type:String, enum: ["Laptop","Desktop"], required:true},
        Brand:{type:String, required:true},
        Model:{type:String, required:true},
        Serial:{type:String, unique:true, required:true },
        Vendor:{type:String, default:null},

        Processor:{type:String, enum: ["Celeron","i3","i5","i7","i9"], required:true},
        GHz:{type:Number, required:true},
        Gen:{type:Number, required:true},
        RAM:{type:Number, required:true},
        BUS:{type:Number, required:true},
        Screen:{type:Number, default:null},
        Storage_Type:{type:String, enum: ["HDD","SSD"], required:true},
        Storage_Size:{type:Number, required:true},
        Condition:{type:String, enum: ["New","Fresh","Usable"], required:true},
        Warentty_Policy:{type:String, enum: ["1 Year","1.5 Years","2 Years","3 Years"], required:true},
        purchase_date:{type:Date, default:null},
        Assigned_To:{type:mongoose.Schema.Types.ObjectId, default:new mongoose.Types.ObjectId("67af3b12a55a523a84f93b73")},

    },
    {
        timestamps:true,
        versionKey:false
    }
)

const ComputersModel = mongoose.model("Computers",ComputerSchema)
export default ComputersModel
