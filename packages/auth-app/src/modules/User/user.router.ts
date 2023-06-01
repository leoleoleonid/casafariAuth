import express from "express";
import UserController from "./user.controller";
import {validate} from 'class-validator';
import {UserDTO} from "./user.dto";
import {ErrorException} from "../../common/errors/error-exception";
import {ErrorCode} from "../../common/errors/error-code";
import {plainToClass} from "class-transformer";
import {privateRoute} from "../Auth/auth.utils";

const router = express.Router();

router.post("/sign-in", async (req, res, next) => {
    try {
        const userDto = plainToClass(UserDTO, req.body) as UserDTO;
        const errors = await validate(userDto);
        if (errors.length) {
            throw next(new ErrorException(ErrorCode.ValidationError, errors));
        }
        const controller = UserController.createInstance();

        const response = await controller.create(userDto);
        return res.send(response);
    } catch (e) {
        return next(e);
    }
});

router.post("/login", async (req, res, next) => {
    console.log(req.body)
    const userDto = plainToClass(UserDTO, req.body);
    const errors = await validate(userDto);
    if (errors.length) {
        return next(new ErrorException(ErrorCode.ValidationError, errors));
    }
    const controller = UserController.createInstance();
    const response = await controller.login(req.body);
    console.log('response', response)
    return res.send(response);
});

router.get("/profile", privateRoute, async (req, res, next) => {
    return res.send((req as any).user);
});


export default router