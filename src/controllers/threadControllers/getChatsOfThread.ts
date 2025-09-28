import { Request, Response } from "express";
import { apiErrorResponse, apiSuccessResponse } from "../../utils/response";
import { thread } from "../../models/threadSchema";


export default async function getChatsOfThread(req: Request , res: Response){
    const {threadId} = req.params;

    if (!threadId){
        return apiErrorResponse(res , "threadId is required" , 400);
    }

    try {
        const threadsData = await thread.findOne({threadId}).populate("chats").exec();

        if (!threadsData){
            return apiErrorResponse(res , "Thread not found" , 404);
        }

        return apiSuccessResponse(res , "Chats fetched successfully" , threadsData.chats , 200);
    }catch (error) {
        return apiErrorResponse(res , "Internal Server Error" , 500);
    }
} 