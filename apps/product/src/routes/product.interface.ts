import { Request, Response } from 'express';

export interface IProductRoute {
    getById(req: Request, res: Response);
    getByEmail(req: Request, res: Response);
    add(req: Request, res: Response);
}
