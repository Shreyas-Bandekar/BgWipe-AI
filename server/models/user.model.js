import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    creditBalance: {
        type: Number,
        default: 10
    }
})


const User = mongoose.model("User", userSchema);

export default User;
