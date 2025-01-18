import { Response } from 'express'

export const responseHandler = (res: Response, status: number, isError: boolean, msg: string, data?: any)=>{
    let responseObject : string | object ={
        "error": isError,
        "message": msg,
        "data": data
    }

    return res.status(status).send(responseObject);
}

export const setResponse = (response:any, statusCode: number,isError: boolean,message: string, data?: any)=>{
    response['statusCode'] = statusCode;
    response['message'] = message;
    response['isError'] = isError;
    response['data'] = data;
    return response;
}