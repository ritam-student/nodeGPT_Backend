import { Request, Response } from "express";
import { apiErrorResponse, apiSuccessResponse } from "../../utils/response";
import { user } from "../../models/userSchema";

export default async function getUser(req : Request , res : Response) {
    const clerkId  = req.params.clerkId;
    

    if (!clerkId){
        return apiErrorResponse(res , "clerkId is required" , 400);
    }

    try {
        const userData = await user.find({ clerkId })
        .populate({
            path : "threads",
            populate: {
                path : "chats"
            }
        });

        if (!userData){
            return apiErrorResponse(res , "User not found" , 404);
        }
        
        return apiSuccessResponse(res , "User fetched successfully" , userData , 200);

    }catch (error){
        return apiErrorResponse(res , "Internal Server Error" , 500);
    }
}