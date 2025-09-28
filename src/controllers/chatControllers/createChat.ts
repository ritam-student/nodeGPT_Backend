import { Request, Response } from "express";
import { apiErrorResponse, apiSuccessResponse } from "../../utils/response";
import { chat } from "../../models/chatSchema";
import { thread } from "../../models/threadSchema";
import mongoose from "mongoose";
import generateResponse from "../../services/generatedResponse";


export default async function createChat(req: Request , res: Response){
    const {role , message , threadId , previousChats} = req.body;
    const session = await mongoose.startSession();

    if (!role || !message || !threadId || !previousChats){
        return apiErrorResponse(res , "role , message , threadId and previousChats are required" , 400);
    }

    try {
        const assistantResponse = await generateResponse(previousChats , message);

        session.startTransaction();
        const newChat = new chat({role , message , threadId});
        await newChat.save({session});

        const updatedThread = await thread.findOneAndUpdate(
            {threadId} ,
            {$push : {chats : newChat._id}} ,
            {new : true, session}
        );

        if (!updatedThread){
            await session.abortTransaction();
            return apiErrorResponse(res , "Thread not found" , 404);
        }

        const assistantChat = new chat({role: "assistant" , message: assistantResponse.data , threadId});
        await assistantChat.save({session});

        await thread.findOneAndUpdate(
            {threadId},
            {$push : {chats : assistantChat._id}} ,
            {new : true , session}  
        );
        
        await session.commitTransaction();
        return apiSuccessResponse(res , "Response generated successfully" , assistantChat , 201);
    }catch (error){
        await session.abortTransaction();
        return apiErrorResponse(res , "Internal Server Error" , 500);
    }finally {
        session.endSession();
    }
}