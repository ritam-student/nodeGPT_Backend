import { user } from "../../models/userSchema";
import { apiErrorResponse, apiSuccessResponse } from "../../utils/response";
import { Request, Response } from "express";


export default async function createUser(req: Request, res: Response) {
    const { name, email, clerkId } = req.body;

    if (!name || !email || !clerkId) {
        return apiErrorResponse(res, "Name, Email and Clerk ID are required", 400);
    }

    try {
        const isUserExist = await user.findOne({email});

        if (! isUserExist){
            const newUser = new user({name , email , clerkId});
            await newUser.save();
            return apiSuccessResponse(res , "User created successfully", newUser , 201);
        }
        
        return apiErrorResponse(res, "User already exists", 409);
    }catch (error){
        return apiErrorResponse(res, "Internal Server Error", error , 500);
    }
}