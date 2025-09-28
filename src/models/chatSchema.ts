

import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        role : {
            type: String,
            enum : ["user" , "assistant"],
            required : true
        },
        message : {
            type : String,
            required : true
        },
        threadId : {    // uuid from frontend
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)


export const chat = mongoose.model("Chat" , chatSchema);