import { Request, Response } from 'express';
import { Payment } from '../types';
import { NIL as NIL_UUID } from 'uuid';
import { HttpStatusCode } from 'axios';
import { IPaymentLogic } from '../logic';
import { IPaymentRoute } from './payment.interface';
import { isNullOrUndefined, getUserDetailsFromRequest } from '@nodejs-microservices/utils';

export class PaymentRoute implements IPaymentRoute {
    private logic: IPaymentLogic;

    constructor(logic: IPaymentLogic) {
        this.logic = logic;
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        if (isNullOrUndefined(id) || id === NIL_UUID) {
            res.status(HttpStatusCode.BadRequest).json({ message: 'Missing id' });
            return;
        }

        const payment: Payment = this.logic.get(id);
        return res.status(HttpStatusCode.Ok).json(payment);
    }

    async getByEmail(req: Request, res: Response) {
        const { email } = req.params;

        if (isNullOrUndefined(email)) {
            res.status(HttpStatusCode.BadRequest).json({ message: 'Missing email' });
            return;
        }

        const payments: Payment[] = this.logic.getByEmail(email);
        return res.status(HttpStatusCode.Ok).json(payments);
    }

    async add(req: Request, res: Response) {
        const { productId, creditCardNumber, quantity } = req.body;

        if (isNullOrUndefined(productId, creditCardNumber, quantity) || isNaN(quantity)) {
            res.status(HttpStatusCode.BadRequest).json({ message: 'Missing productId, creditCardNumber or quantity' });
            return;
        }

        const { email } = getUserDetailsFromRequest(req);
        const payment: Payment = this.logic.add(email, productId, creditCardNumber, quantity);
        return res.status(HttpStatusCode.Ok).json(payment);
    }
}
