import mongoose from "mongoose";
import bcrypt from "bcrypt";

const administratorSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true, enum: ["admin","super admin"], default: "admin" },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

administratorSchema.pre("save", async function (next) {
    const admin = this
    if (!admin.isModified("password")) {
        next()
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(admin.password, salt)
        admin.password = hashedPass
        next()
    } catch (error) { 
        next(error)
    }
})



const AdministratorModel = mongoose.model("Administrator", administratorSchema)
export default AdministratorModel