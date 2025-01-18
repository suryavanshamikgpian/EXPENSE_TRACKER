import express from 'express';
export abstract class CommonRoutesConfig {
    app: express.Application;
    name: string;
    basePath: string;
    version: string;

    constructor(app: express.Application, name: string, basePath: string, version: string) {
        this.app = app;
        this.name = name;
        this.basePath = basePath;
        this.version = version;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }
    getBasePath() {
        return this.basePath;
    }
    getVersion() {
        return this.version;
    }
    abstract configureRoutes(): express.Application;
}
