import mongoose, { Mongoose } from 'mongoose';
const { Schema } = mongoose;

const userScheme = new Schema({
    username : {
        type :String,
        trim : true
    },
    email : {
        unique : true,
        type:String, 
        lowercase: true,
    },
    password :{
        type:String,

    },
    role:{
        type : String,
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    forgotPasswordTokenStatus:String,
    verifyToken: String,
    verifyTokenExpiry: Date,


})

const User = mongoose.models.User  || mongoose.model("User",userScheme)
export default User;