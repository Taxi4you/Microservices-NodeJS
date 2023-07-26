import { Request, Response } from 'express';
import { IShopLogic } from '../logic';
import { HttpStatusCode } from 'axios';
import { DataSummary } from '../types';
import { IShopRoute } from './shop.interface';
import { getUserDetailsFromRequest, getAuthorizationTokenFromRequest } from '@nodejs-microservices/utils';

export class ShopRoute implements IShopRoute {
    private logic: IShopLogic;

    constructor(logic: IShopLogic) {
        this.logic = logic;
    }

    async removeUserData(req: Request, res: Response) {
        const { email } = getUserDetailsFromRequest(req);

        try {
            await this.logic.removeUserData(email);
        } catch (error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
            return;
        }

        res.status(HttpStatusCode.Ok).json({ message: 'Message sent successfully.' });
    }

    async getAllUserData(req: Request, res: Response) {
        const { email } = getUserDetailsFromRequest(req);
        const token = getAuthorizationTokenFromRequest(req);

        const dataSummary: DataSummary = await this.logic.getAllUserData(token, email);
        res.status(HttpStatusCode.Ok).json(dataSummary);
    }

    async addSampleData(req: Request, res: Response) {
        const token = getAuthorizationTokenFromRequest(req);

        try {
            await this.logic.addSampleData(token);
        } catch (error) {
            res.status(HttpStatusCode.InternalServerError).json({ message: error.message });
            return;
        }

        res.status(HttpStatusCode.Ok).json({ message: 'Added sample data successfully' });
    }
}
