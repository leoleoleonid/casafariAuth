import * as crypto from "crypto";
import jwt from 'jsonwebtoken'
import {User} from "../User/user.entity";
import {ErrorException} from "../../common/errors/error-exception";
import {ErrorCode} from "../../common/errors/error-code";
import {Request, Response, NextFunction} from 'express';

//TODO to config
const secret = 'MY_SECRET_!@#'
const jwtSecretKey = 'mcb3DaS05Yvt';

export const hashPassword = (password: string): Promise<string> =>  {
    return new Promise((resolve, reject) => {
        const iterations = 10000;
        const keylen = 64;
        const digest = 'sha512';
        crypto.pbkdf2(password, secret, iterations, keylen, digest, (error, hashedPassword) => {
            if (error) reject(error);
            resolve(hashedPassword.toString('hex'))
        });
    })
};

export const compareHash = async (hash: string, password: string): Promise<boolean> => {
    const receivedHash = await hashPassword(password);
    return receivedHash === hash;
}

export const generateToken = (payload: Partial<User>) => {
    console.log('payload', payload);
    const header = { alg: 'HS256', typ: 'JWT' };
    const token = jwt.sign(JSON.parse(JSON.stringify(payload)), jwtSecretKey, { header });
    return token;
};

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if(!token) {
        return next(new ErrorException(ErrorCode.Unauthenticated, 'No token'))
    }


    const decodedToken = jwt.verify(token, jwtSecretKey);
    console.log('decodedToken', decodedToken);
    (req as any).user = decodedToken;
    next();
}