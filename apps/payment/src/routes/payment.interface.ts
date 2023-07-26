import { Request, Response } from 'express';

export interface IPaymentRoute {
    getById(req: Request, res: Response);
    getByEmail(req: Request, res: Response);
    add(req: Request, res: Response);
}
