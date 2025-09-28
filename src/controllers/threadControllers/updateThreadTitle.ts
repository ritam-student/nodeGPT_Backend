import { Request, Response } from "express";
import { apiErrorResponse, apiSuccessResponse } from "../../utils/response";
import { thread } from "../../models/threadSchema";


export default async function updateThreadTitle(req : Request , res : Response) {
    const {threadId , title} = req.body;

    if (!threadId || !title){
        return apiErrorResponse(res , "threadId and title are required" , 400);
    }

    try {
        const updatedThread = await thread.findOneAndUpdate(
            {threadId} , 
            {$set : {title}} ,
            {new : true}
        )

        if (!updatedThread){
            return apiErrorResponse(res , "Thread not found" , 404);
        }

        return apiSuccessResponse(res , "Thread title updated successfully" , updatedThread , 200);
    }catch(error) {
        return apiErrorResponse(res , "Internal Server Error" , 500);
    }
}