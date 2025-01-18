import dotenv from "dotenv";

const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import { Sequelize } from "sequelize";
import config from "../../config/config";

const env_config = process.env.NODE_ENV == 'development'? config.development : config.production;

class EXTR_DB {
    private sequelizeConnection: Sequelize;
    constructor(){
        console.log(`Connecting database`);
        this.sequelizeConnection = new Sequelize(env_config.database, env_config.username, env_config.password, env_config);
    }

    getConnection(): Sequelize {
        try {
            return this.sequelizeConnection;
        }
        catch (error) {
            console.log("Database Connection Error: ", error);
            throw error;
        }
    }

    async testConnection(): Promise<boolean> {
        try {
            await this.sequelizeConnection.authenticate();
            return true;
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            return false;
        }
    }
}

export default new EXTR_DB();