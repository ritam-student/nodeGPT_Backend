import { Response } from "express";

export const apiSuccessResponse = (res : Response , message : string , data : any | null , status = 200) => {
    return res.status(status).json({
        success : true,
        message : message,
        data : data
    });
}


export const apiErrorResponse = (res : Response , message: string , error : any | null, status = 400 ) => {
    return res.status(status).json({
        success: false,
        message : message,
        data : error
    });
}


export const agentSuccessResponse = (message : string , status = 200 , data : string | null) => {
    return {
        success: true,
        status: status,
        message: message,
        data: data
    }
}


export const agentErrorResponse = (message : string , status = 400 , error : any | null) => {
    return {
        success : false,
        status : status,
        message ,
        data : error
    }
}