import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: {
        type: Array,
        default: [],
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "admin"
    }
},
{ timestamps: true}
)

const User = mongoose.model("User", UserSchema);
export default User;