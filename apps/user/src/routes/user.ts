import { Request, Response } from 'express';
import { IUserLogic } from '../logic';
import { HttpStatusCode } from 'axios';
import { TokenPayload } from '../types';
import { IUserRoute } from './user.interface';
import { isNullOrUndefined } from '@nodejs-microservices/utils';

export class UserRoute implements IUserRoute {
    private logic: IUserLogic;

    constructor(logic: IUserLogic) {
        this.logic = logic;
    }

    async signup(req: Request, res: Response) {
        const { email, password } = req.body;

        if (isNullOrUndefined(email) || isNullOrUndefined(password)) {
            res.status(HttpStatusCode.BadRequest).json({ message: 'Missing email or password' });
            return;
        }

        if (this.logic.doesEmailExist(email)) {
            res.status(HttpStatusCode.BadRequest).json({ message: 'Email already exists' });
            return;
        }

        const token = await this.logic.signup(email, password);
        return res.status(HttpStatusCode.Ok).json({ token });
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (isNullOrUndefined(email) || isNullOrUndefined(password)) {
            res.status(HttpStatusCode.BadRequest).json({ message: 'Missing email or password' });
            return;
        }

        const token = await this.logic.login(email, password);
        if (isNullOrUndefined(token)) {
            res.status(HttpStatusCode.Unauthorized).json({ message: 'Invalid email or password' });
            return;
        }

        return res.status(HttpStatusCode.Ok).json({ token });
    }

    async validateToken(req: Request, res: Response) {
        const { token } = req.body;

        let tokenPayload: TokenPayload;
        try {
            tokenPayload = await this.logic.validateToken(token);
        } catch (error) {
            res.status(HttpStatusCode.Unauthorized).json({ message: error.message });
            return;
        }

        return res.status(HttpStatusCode.Ok).json(tokenPayload);
    }
}
