

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        clerkId : {     // recieve from the frontend
            type : String,
            unique : true
        },
        name : {        // stores username | firstname
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
            unique: true,
        },
        threads : [{        // stores _id
            type: mongoose.Schema.Types.ObjectId,
            ref : "Thread"
        }]
    },
    {
        timestamps: true
    }
);

export const user = mongoose.model("User", userSchema);