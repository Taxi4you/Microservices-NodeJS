import { Request, Response } from 'express';
import { Product } from '../types';
import { NIL as NIL_UUID } from 'uuid';
import { HttpStatusCode } from 'axios';
import { IProductLogic } from '../logic';
import { IProductRoute } from './product.interface';
import { isNullOrUndefined, getUserDetailsFromRequest } from '@nodejs-microservices/utils';

export class ProductRoute implements IProductRoute {
    private logic: IProductLogic;

    constructor(logic: IProductLogic) {
        this.logic = logic;
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        if (isNullOrUndefined(id) || id === NIL_UUID) {
            res.status(HttpStatusCode.BadRequest).json({ message: 'Missing id' });
            return;
        }

        const product: Product = this.logic.get(id);
        return res.status(HttpStatusCode.Ok).json(product);
    }

    async getByEmail(req: Request, res: Response) {
        const { email } = req.params;

        if (isNullOrUndefined(email)) {
            res.status(HttpStatusCode.BadRequest).json({ message: 'Missing email' });
            return;
        }

        const products: Product[] = this.logic.getByEmail(email);
        return res.status(HttpStatusCode.Ok).json(products);
    }

    async add(req: Request, res: Response) {
        const { name, description, price } = req.body;

        if (isNullOrUndefined(name, description, price) || isNaN(price)) {
            res.status(HttpStatusCode.BadRequest).json({ message: 'Missing name, description or price' });
            return;
        }

        const { email } = getUserDetailsFromRequest(req);
        const product: Product = this.logic.add(email, name, description, price);
        return res.status(HttpStatusCode.Ok).json(product);
    }
}
