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
	) {
		this.authService = AuthService;
		this.helloUser = this.helloUser.bind(this);
		this.signUp = this.signUp.bind(this);
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

	async signUp(
		req: express.Request,
		res: express.Response
	): Promise<void> {

		try {
			const firstName = String(req.body.firstName);
			const lastName = String(req.body.lastName);
			const email = String(req.body.email);
			const password = String(req.body.password);

			const response = await this.authService.signUp(firstName, lastName, email, password);
			if (response) {
				responseHandler(
					res,
					response.statusCode,
					response.isError,
					response.message,
					response?.data
				)
			}
		} catch (error) {
			console.log(error);
			responseHandler(
				res,
				eStatusCode.INTERNAL_SERVER_ERROR,
				true,
				error ? `${error}` : eErrorMessage.ServerError
			);
		}
	}


}

const authServiceInstance = new AuthService();
export default new AuthController(authServiceInstance);