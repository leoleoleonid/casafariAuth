import {Application} from "express";
import router from "./modules/User/user.router";

export default function createRoutes(app: Application) {
    app.use('/auth/user', router)
}