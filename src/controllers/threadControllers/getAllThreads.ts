import { Request, Response } from "express";
import { apiErrorResponse, apiSuccessResponse } from "../../utils/response";
import { thread } from "../../models/threadSchema";


export default async function getAllThreads(req: Request , res: Response) {
    const {clerkId} = req.params;
    console.log(clerkId);

    if (!clerkId){
        return apiErrorResponse(res , "clerkId is required" , 400);
    }

    try {
        const threads = await thread.find({userId : clerkId}).sort({updatedAt: -1});

        if (!threads) {
            return apiErrorResponse(res, "No threads found", 404);
        }

        return apiSuccessResponse(res, "Threads fetched successfully", threads, 200);
    }catch (error){
        return apiErrorResponse(res , "Internal Server Error" , 500);
    }

}