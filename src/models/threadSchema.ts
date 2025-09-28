
import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            default : "New Chat"
        },
        threadId : {        // uuid from frontend
            type: String,
            required : true,
            unique: true
        },
        chats : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Chat"
        }],
        userId : {      // clerkId of the user
            type : String,
            required : true
        }

    },
    {
        timestamps: true
    }
)

export const thread = mongoose.model("Thread" , threadSchema);