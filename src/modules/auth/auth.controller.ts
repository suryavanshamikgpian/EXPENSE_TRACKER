import express from 'express'
import { iAuthService } from './iAuthService';
import { responseHandler } from '../../handler/responsehandler';
import { eStatusCode } from '../../enum/status_code.enum';
import { eErrorMessage } from '../../enum/error_message.enum';
import { AuthService } from './auth.service';

class AuthController {
    private readonly authService: iAuthService;
    constructor(
        AuthService: iAuthService,
    ){
        this.authService = AuthService;
    }


    async helloUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<any> {
        try {
            responseHandler(
                res,
                eStatusCode.OK,
                false,
                "Hello User"
            )
        } catch (error) {
            console.log("Auth-Controller error:", error)
            responseHandler(
                res,
                eStatusCode.INTERNAL_SERVER_ERROR,
                false,
                eErrorMessage.ServerError,
                error
            )
        }
    }
}

const authServiceInstance = new AuthService();
export default new AuthController(authServiceInstance);