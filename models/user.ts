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
    passwrod :{
        type:String,

    },

})

const User = mongoose.models.User  || mongoose.model("User",userScheme)
export default User;