import dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import express from 'express';
import { iAuthService } from './iAuthService';
import { serviceResponse } from '../../enum/response.types';
import { eStatusCode } from '../../enum/status_code.enum';
import { setResponse } from '../../handler/responsehandler';
import { eErrorMessage } from '../../enum/error_message.enum';
import jwt from 'jsonwebtoken'
import User from "../../db/models/user.model";

const JWT_SECRET = `${process.env.JWT_AUTH_KEY}`

export class AuthService implements iAuthService {

    async signUp(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ): Promise<serviceResponse>{
        let response: serviceResponse = {
            statusCode: eStatusCode.BAD_REQUEST,
            isError: true,
            message: "failed to register user",
        }
        try {
            if (!firstName || !lastName || !email || !password) {
                response = setResponse(response, eStatusCode.BAD_REQUEST, true, "All fields are required");
                return response;
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                response = setResponse(response, eStatusCode.BAD_REQUEST, true, "User with same email already exists");
                return response;
            }

            // Hash the password using bcrypt
            const hashedPassword = await User.hashPassword(password);

            // Create a new user in the database
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });

            // Generate JWT token
            const token = jwt.sign(
                { userId: newUser.id, email: newUser.email },
                JWT_SECRET,
                { expiresIn: '1h' } // Set token expiry time as needed
            );

            const data = {
                "id":newUser.id,
                "firstName":newUser.firstName,
                "lastName":newUser.lastName,
                "email": newUser.email,
                "access-token": token
            }

            response = setResponse(response,eStatusCode.OK,false,"User registered",data);
            return response;
        } catch (error) {
            console.log("error: ",error);            
            response = setResponse(response, eStatusCode.BAD_REQUEST, true, eErrorMessage.ServerError);
            return response;
        }
    }

}