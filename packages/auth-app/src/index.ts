import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import { config } from "./common/config";
import {errorHandler} from "./common/errors/error-handler";
import {dataSource} from "./common/db/connection";
import createRoutes from "./createRoutes";
import bodyParser from "body-parser";
import cors from "cors"
import * as process from "process";

// import {shelfInst} from "./modules/Shelf/Shelf";

const PORT = config.port;

// shelfInst
const app: Application = express();
// @ts-ignore
app.use(bodyParser.urlencoded({ extended: true }));
// @ts-ignore
app.use(bodyParser.json({ type: 'application/json' }));

if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        credentials: true,
        "origin": `http://localhost:${process.env.CLIENT_PORT}`,
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }))
}

app.use(morgan("tiny"));
app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

createRoutes(app);

app.use(errorHandler);

dataSource.initialize().then( () => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });

}).catch((e) => {
    console.error(`Can't connect to DB!!!`)
    console.error(e)
    // process.exit(0)
})
