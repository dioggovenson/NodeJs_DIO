import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT, { SignOptions } from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic.authentication.middleware";
import bearerAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token/validate', bearerAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
})

authorizationRoute.post('/token/refresh', bearerAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        throw new ForbiddenError('Credenciais não informadas');
    }
    const [authenticationType, token] = authorizationHeader.split(' ');
    if (authenticationType !== 'Bearer' || !token) {

        throw new ForbiddenError("Tipo de autenticação inválido");
    }
    try {
        const tokenPayload = JWT.verify(token, 'my_secret_key');

        if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
            throw new ForbiddenError('Token inválido!');
        }
        const jwtPayload = { username: tokenPayload.username };
        const jwtOptions: SignOptions = { subject: tokenPayload.sub, expiresIn: '30m' };
        const secretKey = 'my_secret_key';

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions)
        res.status(StatusCodes.OK).json({ token: jwt })
    } catch (error) {
        throw new ForbiddenError('Token inválido')
    };
    res.status(StatusCodes.OK).send(req.headers);
})

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            throw new ForbiddenError("Usuário não informado!")
        }
        const jwtPayload = { username: user.username };
        const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: '1m' };
        const secretKey = 'my_secret_key';

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions)
        res.status(StatusCodes.OK).json({ token: jwt })
        
    } catch (error) {
        next(error);
    }
})
export default authorizationRoute;