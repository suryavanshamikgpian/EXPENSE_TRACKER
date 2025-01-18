import dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
  throw dotenvResult.error;
}
import express from 'express'
import RouterConfig from "./src/routes";


const app: express.Application = express();
const port = process.env.PORT;

// Configure the routes
const routerConfig = new RouterConfig(app);
routerConfig.configureRoutes();

const runningMessage = `Server running at port : ${port}`

app.listen(port, ()=>{
    console.log(runningMessage);
});