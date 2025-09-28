import { Request, Response } from "express";
import { apiErrorResponse, apiSuccessResponse } from "../../utils/response";
import generateResponse from "../../services/generatedResponse";


export default async function chatResponse(req: Request , res:Response){
    const {query , previousChats} = req.body;

    if (!query){
        return apiErrorResponse(res , "query is required" , 400);
    }

    try {
        const response = await generateResponse(previousChats ,query);

        if (!response || !response.success){
            return apiErrorResponse(res , "Failed to generate response" , 500);
        }

        return apiSuccessResponse(res , "Response generated successfully" , response.data , 200);
    }catch (error){
        return apiErrorResponse(res , "Internal Server Error" , 500);
    }
}