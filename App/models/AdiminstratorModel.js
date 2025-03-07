import mongoose from "mongoose";
import bcrypt from "bcrypt";

const administratorSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { 
            type: String, 
            required: true,
            minlength: 8,
            maxlength: 1024,
            validate: {
                validator: function(v) {
                    // Regex pattern example: at least one number, one lowercase, one uppercase, and at least 8 characters
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
                },
                message: props => `${props.value} is not a valid password!`
            }
        },
        role: { type: String, required: true, enum: ["admin", "super admin"], default: "admin" },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

administratorSchema.pre("save", async function (next) {
    const admin = this;
    if (!admin.isModified("password")) {
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(admin.password, salt);
        admin.password = hashedPass;
        next();
    } catch (error) {
        next(error);
    }
});

const AdministratorModel = mongoose.model("Administrator", administratorSchema);
export default AdministratorModel;
