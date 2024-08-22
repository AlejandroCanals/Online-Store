import mongoose from "mongoose";

const userSchema = ({

    "userName":{
        type: String,
        required: false,
        unique:true,
    },
    "email":{
        type:String,
        required:true,
        unique:true,
    },
    "password":{
        type:String,
        required:true,
    },
    "createdAt":{
        type:Date,
        default:Date.now,
    },
});


