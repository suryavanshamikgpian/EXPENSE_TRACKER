import express from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import AuthController from '../modules/auth/auth.controller';


export class AuthRoutes extends CommonRoutesConfig {
    constructor(app: express.Application,basePath: string, version :string){
        super(app, 'AuthRoutes', basePath, version);
    }

    configureRoutes() {
        this.app
            .route(`/${this.basePath}/${this.version}`)
            .get(AuthController.helloUser);

        this.app
            .route(`/${this.basePath}/${this.version}/signup`)
            .get(AuthController.signUp);
        
        return this.app;
    }
}