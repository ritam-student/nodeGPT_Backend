import { NextFunction, Request, Response } from "express";
import { apiErrorResponse } from "../utils/response";
import { user } from "../models/userSchema";


export default async function authUser(req: Request , res: Response , next: NextFunction){
    const  clerkId  = req.headers.clerkId as string;

    if (!clerkId){
        return apiErrorResponse(res , "Unauthorized: clerkId header is missing" , 401);
    }

    try {
        const userData = await user.findOne({clerkId});

        if (!userData){
            return apiErrorResponse(res , "Unauthorized: User not found" , 401);
        }

        next();
    }catch (error){
        return apiErrorResponse(res, "Internal Server Error" , error ,500);
    }
} 