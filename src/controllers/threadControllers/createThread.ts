import { Request, Response } from "express";
import { apiErrorResponse, apiSuccessResponse } from "../../utils/response";
import { thread } from "../../models/threadSchema";
import { user } from "../../models/userSchema";
import mongoose from "mongoose";

// POST
export default async function createThread(req : Request , res : Response) {
    const {threadId , clerkId , title} = req.body;
    const session = await mongoose.startSession();

    if (!threadId || !clerkId || !title){
        return apiErrorResponse(res , "threadId , clerkId and title are required" , 400);
    }

    try {
        
        const isThreadExist = await thread.findOne({threadId});
        session.startTransaction();
        if (! isThreadExist){
            const newThread = new thread({threadId , userId : clerkId , title});
            await newThread.save({session});

            await user.findOneAndUpdate(
                {clerkId} , 
                {$push : {threads : newThread._id}},
                {new: true , session},
                
            )
            await session.commitTransaction();
            return apiSuccessResponse(res , "Thread created successfully", newThread , 201);
        }

        return apiErrorResponse(res , "Thread already exists" , 409);
    }catch(error){
        await session.abortTransaction();
        return apiErrorResponse(res , "Internal Server Error" , 500);
    }finally{
        session.endSession();
    }
}