import { Request, Response } from "express";
import { apiErrorResponse, apiSuccessResponse } from "../../utils/response";
import { thread } from "../../models/threadSchema";
import { chat } from "../../models/chatSchema";
import { user } from "../../models/userSchema";
import mongoose from "mongoose";

export default async function deleteThread(req:  Request , res: Response){
    const {threadId , clerkId}  = req.body;
    const session = await mongoose.startSession();

    if (!threadId || !clerkId){
        return apiErrorResponse(res , "threadId and clerkId are required" , 400);
    }

    try {
        session.startTransaction();
        const deletedThread = await thread.findOneAndDelete({threadId, userId: clerkId}).session(session);

        if (!deletedThread){
            await session.abortTransaction();
            return apiErrorResponse(res , "Thread not found" , 404);
        }

        await chat.deleteMany({threadId}).session(session);

        await user.findOneAndUpdate(
            {clerkId} ,
            {$pull : {threads : deletedThread._id}} ,
            {new : true, session}
        );

        await session.commitTransaction();

        return apiSuccessResponse(res , "Thread deleted successfully" , deletedThread , 200);

    }catch (error) {
        await session.abortTransaction();
        return apiErrorResponse(res , "Internal Server Error" , 500);
    }finally {
        session.endSession();
    }

}